import nodemailer from 'nodemailer';

const TARGET_EMAIL = process.env.TARGET_EMAIL || 'nexhack@geetauniversity.edu.in';
const SMTP_USER = process.env.SMTP_USER || 'nexhack@geetauniversity.edu.in';
const SMTP_PASS = (process.env.SMTP_PASS || 'xpcv lvxe ovhg uvvl').replace(/\s+/g, '');
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';

let transporter = null;
if (SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
}

export async function sendMailNotification(subject, htmlContent, replyTo) {
  if (!transporter) {
    console.log(`[Mail Simulation -> ${TARGET_EMAIL}]`);
    console.log(`Subject: ${subject}`);
    console.log(`Reply-To: ${replyTo}`);
    return false;
  }

  const mailPromise = transporter.sendMail({
    from: `"${process.env.SENDER_NAME || 'NexHack 2.0 Portal'}" <${SMTP_USER}>`,
    to: TARGET_EMAIL,
    replyTo: replyTo,
    subject: subject,
    html: htmlContent,
  });

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('SMTP dispatch timed out')), 9000)
  );

  try {
    const info = await Promise.race([mailPromise, timeoutPromise]);
    console.log(`[Email Delivered] Sent to ${TARGET_EMAIL}: ID ${info.messageId}`);
    return true;
  } catch (err) {
    console.error(`[Email Delivery Error] ${err.message}`);
    return false;
  }
}

export { transporter, TARGET_EMAIL };
