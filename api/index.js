import { transporter, TARGET_EMAIL } from '../lib/mailer.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: 'ok',
    service: 'NexHack 2.0 API Server',
    targetEmail: TARGET_EMAIL,
    smtpConfigured: !!transporter,
    timestamp: new Date().toISOString(),
    endpoints: [
      'POST /api/contact',
      'POST /api/sponsor'
    ]
  });
}
