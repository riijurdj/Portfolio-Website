const Message = require('../models/Message');

async function createMessage(req, res) {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const saved = await Message.create({ name, email, subject, message });
  res.status(201).json({ message: 'Message sent successfully', id: saved._id });
}

module.exports = { createMessage };
