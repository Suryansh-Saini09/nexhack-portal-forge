import nodemailer from 'nodemailer';

const TARGET_EMAIL = process.env.TARGET_EMAIL || 'nexhack@geetauniversity.edu.in';

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const SENDER_NAME = process.env.SENDER_NAME || 'NexHack 2.0 Portal';

// Validate required SMTP configuration
if (!SMTP_USER) {
  console.error('[Mailer] Missing SMTP_USER environment variable');
}

if (!SMTP_PASS) {
  console.error('[Mailer] Missing SMTP_PASS environment variable');
}

if (!TARGET_EMAIL) {
  console.error('[Mailer] Missing TARGET_EMAIL environment variable');
}

const transporter =
  SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS.replace(/\s+/g, ''),
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      })
    : null;

export async function sendMailNotification(subject, htmlContent, replyTo) {
  if (!transporter) {
    throw new Error(
      'Mailer is not configured. Check SMTP_USER and SMTP_PASS environment variables.'
    );
  }

  try {
    const info = await Promise.race([
      transporter.sendMail({
        from: `"${SENDER_NAME}" <${SMTP_USER}>`,
        to: TARGET_EMAIL,
        replyTo: replyTo || undefined,
        subject,
        html: htmlContent,
      }),

      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('SMTP dispatch timed out')),
          9000
        )
      ),
    ]);

    console.log(
      `[Email Delivered] Sent to ${TARGET_EMAIL}: ${info.messageId}`
    );

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('[Email Delivery Error]', error);

    throw new Error(
      `Failed to send email: ${error?.message || 'Unknown SMTP error'}`
    );
  }
}

export { transporter, TARGET_EMAIL };