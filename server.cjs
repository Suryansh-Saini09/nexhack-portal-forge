require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5005;
const TARGET_EMAIL = process.env.TARGET_EMAIL || 'nexhack@geetauniversity.edu.in';

app.use(cors());
app.use(express.json());

const REGISTRATIONS_FILE = path.join(__dirname, 'registrations.json');
const MESSAGES_FILE = path.join(__dirname, 'messages.json');
const SPONSORS_FILE = path.join(__dirname, 'sponsors.json');
const MENTORS_FILE = path.join(__dirname, 'mentors.json');

// Configure Nodemailer Transporter
let transporter = null;
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000,
  });
  console.log(`[Email] Mailer active for target: ${TARGET_EMAIL} via ${process.env.SMTP_HOST || 'smtp.gmail.com'}`);
} else {
  console.log(`[Email] Target email configured to: ${TARGET_EMAIL}. (SMTP_USER/SMTP_PASS missing in .env -- submissions are stored to JSON files and logged).`);
}

// Helper to send email notification
async function sendMailNotification(subject, htmlContent, replyTo) {
  if (!transporter) {
    console.log(`[Mail Simulation -> ${TARGET_EMAIL}]`);
    console.log(`Subject: ${subject}`);
    console.log(`Reply-To: ${replyTo}`);
    return;
  }

  // 5-second max timeout guard for mail dispatch
  const mailPromise = transporter.sendMail({
    from: `"${process.env.SENDER_NAME || 'NexHack 2.0 Portal'}" <${process.env.SMTP_USER}>`,
    to: TARGET_EMAIL,
    replyTo: replyTo,
    subject: subject,
    html: htmlContent,
  });

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('SMTP dispatch timed out')), 5000)
  );

  try {
    const info = await Promise.race([mailPromise, timeoutPromise]);
    console.log(`[Email Delivered] Sent to ${TARGET_EMAIL}: ID ${info.messageId}`);
  } catch (err) {
    console.error(`[Email Delivery Notice] ${err.message}`);
  }
}

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

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    targetEmail: TARGET_EMAIL,
    smtpConfigured: !!transporter,
    timestamp: new Date().toISOString() 
  });
});

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

  // Send Email Notification
  sendMailNotification(
    `🧙‍♂️ New Registration: ${name} (${academy})`,
    `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 8px;">
        <h2 style="color: #eeb939;">NexHack 2.0 - New Participant Registration</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Institution/Academy:</strong> ${academy}</p>
        <p><strong>Year of Study:</strong> ${year || 'N/A'}</p>
        <p><strong>Team Size:</strong> ${teamSize || 'N/A'}</p>
        <p><strong>GitHub:</strong> ${github || 'N/A'}</p>
        <hr style="border-color: #334155;" />
        <p style="font-size: 12px; color: #94a3b8;">Dispatched to ${TARGET_EMAIL} via NexHack Portal Backend.</p>
      </div>
    `,
    email
  );

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

  // Send Email Notification
  sendMailNotification(
    `🦉 Owl Post Inquiry from ${name}`,
    `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0e1222; color: #f5f5fa; border-radius: 8px;">
        <h2 style="color: #eeb939;">NexHack 2.0 - Owl Post Message</h2>
        <p><strong>Sender Name:</strong> ${name}</p>
        <p><strong>Sender Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-left: 4px solid #eeb939;">
          ${message}
        </blockquote>
        <hr style="border-color: rgba(255, 255, 255, 0.1);" />
        <p style="font-size: 12px; color: #a0a0b0;">Reply directly to this email to answer ${name}.</p>
      </div>
    `,
    email
  );

  res.status(200).json({ success: true, message: 'Message sent successfully' });
});

// Sponsorship Endpoint
app.post('/api/sponsor', (req, res) => {
  const { company, contactName, email, tier, message } = req.body;

  if (!company || (!contactName && !company) || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const inquiries = readJsonFile(SPONSORS_FILE);
  const newInquiry = {
    id: Date.now().toString(),
    company,
    contactName: contactName || company,
    email,
    tier: tier || 'General',
    message,
    timestamp: new Date().toISOString()
  };

  inquiries.push(newInquiry);
  writeJsonFile(SPONSORS_FILE, inquiries);

  console.log(`[Sponsorship] New inquiry from: ${company} (${contactName || email})`);

  // Send Email Notification
  sendMailNotification(
    `💎 Sponsorship Proposal: ${company} (${tier || 'General'})`,
    `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0b1120; color: #f8fafc; border-radius: 8px;">
        <h2 style="color: #eeb939;">NexHack 2.0 - Sponsorship Inquiry</h2>
        <p><strong>Company/Organization:</strong> ${company}</p>
        <p><strong>Contact Person:</strong> ${contactName || company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Interested Tier:</strong> ${tier || 'General'}</p>
        <p><strong>Message / Proposal Details:</strong></p>
        <blockquote style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-left: 4px solid #38bdf8;">
          ${message || 'No additional message provided.'}
        </blockquote>
        <hr style="border-color: #1e293b;" />
        <p style="font-size: 12px; color: #94a3b8;">Reply directly to this email to contact the sponsor.</p>
      </div>
    `,
    email
  );

  res.status(200).json({ success: true, message: 'Inquiry submitted successfully' });
});

// Mentor Application Endpoint
app.post('/api/mentor', (req, res) => {
  const { name, email, github, linkedin, experience } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const mentors = readJsonFile(MENTORS_FILE);
  const newMentor = {
    id: Date.now().toString(),
    name,
    email,
    github,
    linkedin,
    experience,
    timestamp: new Date().toISOString()
  };

  mentors.push(newMentor);
  writeJsonFile(MENTORS_FILE, mentors);

  console.log(`[Mentor] New application from: ${name} (${email})`);

  // Send Email Notification
  sendMailNotification(
    `🎓 Mentor Application: ${name}`,
    `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 8px;">
        <h2 style="color: #c084fc;">NexHack 2.0 - Mentor Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>GitHub:</strong> ${github || 'N/A'}</p>
        <p><strong>LinkedIn:</strong> ${linkedin || 'N/A'}</p>
        <p><strong>Experience & Background:</strong></p>
        <blockquote style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-left: 4px solid #c084fc;">
          ${experience || 'N/A'}
        </blockquote>
        <hr style="border-color: #334155;" />
        <p style="font-size: 12px; color: #94a3b8;">Dispatched to ${TARGET_EMAIL}.</p>
      </div>
    `,
    email
  );

  res.status(200).json({ success: true, message: 'Application submitted successfully' });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  console.log(`Target Email for notifications: ${TARGET_EMAIL}`);
});
