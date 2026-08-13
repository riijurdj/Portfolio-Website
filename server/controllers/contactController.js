const { Resend } = require('resend');
const Message = require('../models/Message');
const { getPortfolioDoc } = require('./portfolioController');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendNotificationEmail({ name, email, subject, message }) {
  if (!resend) return; // Email notifications are opt-in — no RESEND_API_KEY, no send.

  const portfolio = await getPortfolioDoc();
  const to = portfolio.contact?.email;
  if (!to) return;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'Portfolio Contact Form <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: `Portfolio contact: ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p style="white-space: pre-line;">${escapeHtml(message)}</p>
    `,
  });
}

async function createMessage(req, res) {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const saved = await Message.create({ name, email, subject, message });

  try {
    await sendNotificationEmail({ name, email, subject, message });
  } catch (err) {
    // The message is already saved — an email hiccup shouldn't fail the request.
    console.error('Failed to send contact notification email:', err.message);
  }

  res.status(201).json({ message: 'Message sent successfully', id: saved._id });
}

module.exports = { createMessage };
