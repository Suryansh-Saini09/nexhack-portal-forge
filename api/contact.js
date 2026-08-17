import { sendMailNotification } from '../lib/mailer.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields (name, email, message)' });
  }

  console.log(`[Owl Post Serverless] Message from: ${name} (${email})`);

  await sendMailNotification(
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

  return res.status(200).json({ success: true, message: 'Message sent successfully' });
}
