import nodemailer from 'nodemailer'

function getTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials are not configured')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

export async function sendPasswordResetEmail({ to, name, resetUrl }) {
  const transporter = getTransporter()

  await transporter.sendMail({
    from: `"MarketPro Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Reset your MarketPro password',
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
        <h2>Password reset request</h2>
        <p>Hello ${name || 'there'},</p>
        <p>Use the secure link below to reset your MarketPro password. This link expires in 15 minutes.</p>
        <p><a href="${resetUrl}" style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 18px;border-radius:6px;text-decoration:none">Reset password</a></p>
        <p>If you did not request this, you can ignore this email.</p>
      </div>
    `,
  })
}
