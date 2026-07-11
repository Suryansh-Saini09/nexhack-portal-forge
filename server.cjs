const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const REGISTRATIONS_FILE = path.join(__dirname, 'registrations.json');
const MESSAGES_FILE = path.join(__dirname, 'messages.json');
const SPONSORS_FILE = path.join(__dirname, 'sponsors.json');

// Helper to read JSON file
function readJsonFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

// Helper to write JSON file
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
  }
}

// Registration Endpoint
app.post('/api/register', (req, res) => {
  const { name, email, phone, academy, year, teamSize, github } = req.body;
  
  if (!name || !email || !phone || !academy) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const registrations = readJsonFile(REGISTRATIONS_FILE);
  const newRegistration = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    academy,
    year,
    teamSize,
    github,
    timestamp: new Date().toISOString()
  };

  registrations.push(newRegistration);
  writeJsonFile(REGISTRATIONS_FILE, registrations);

  console.log(`[Registry] New registration added: ${name} (${email})`);
  res.status(200).json({ success: true, message: 'Registration successful' });
});

// Contact Endpoint (Owl Post)
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const messages = readJsonFile(MESSAGES_FILE);
  const newMessage = {
    id: Date.now().toString(),
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  messages.push(newMessage);
  writeJsonFile(MESSAGES_FILE, messages);

  console.log(`[Owl Post] New message received from: ${name} (${email})`);
  res.status(200).json({ success: true, message: 'Message sent successfully' });
});

// Sponsorship Endpoint
app.post('/api/sponsor', (req, res) => {
  const { company, contactName, email, tier, message } = req.body;

  if (!company || !contactName || !email || !tier) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const inquiries = readJsonFile(SPONSORS_FILE);
  const newInquiry = {
    id: Date.now().toString(),
    company,
    contactName,
    email,
    tier,
    message,
    timestamp: new Date().toISOString()
  };

  inquiries.push(newInquiry);
  writeJsonFile(SPONSORS_FILE, inquiries);

  console.log(`[Sponsorship] New inquiry from: ${company} (${contactName})`);
  res.status(200).json({ success: true, message: 'Inquiry submitted successfully' });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
