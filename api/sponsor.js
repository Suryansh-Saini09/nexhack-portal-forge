import { sendMailNotification } from '../lib/mailer.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
    });
  }

  const { company, contactName, email, tier, message } = req.body || {};

  if (!company || !email) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
    });
  }

  console.log(
    `[Sponsorship Serverless] Proposal from: ${company} (${contactName || email})`
  );

  try {
    await sendMailNotification(
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

          <p style="font-size: 12px; color: #94a3b8;">
            Reply directly to this email to contact the sponsor.
          </p>
        </div>
      `,
      email
    );

    return res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully',
    });
  } catch (error) {
    console.error('[Sponsorship API Error]', error);

    return res.status(500).json({
      success: false,
      error: 'Unable to submit your inquiry right now. Please try again later.',
    });
  }
}