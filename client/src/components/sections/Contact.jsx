import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiLoader, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { sendContactMessage } from '../../api/portfolioApi.js';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

export default function Contact({ contact }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  if (!contact) return null;
  const { email, phone, location, github, linkedin } = contact;

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await sendContactMessage(form);
      setStatus('success');
      setForm(EMPTY_FORM);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-shell">
      <motion.p {...fadeUp} className="section-eyebrow text-center">
        Get In Touch
      </motion.p>
      <motion.h2 {...fadeUp} className="section-heading text-center mb-14">
        Contact
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto w-full items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 space-y-6"
        >
          <p className="text-text-secondary leading-relaxed">
            Have a project in mind, a role to discuss, or just want to say hi? My inbox is open.
          </p>

          <div className="space-y-4">
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-text-secondary hover:text-accent-cyan transition-colors">
                <span className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center">
                  <FiMail />
                </span>
                {email}
              </a>
            )}
            {phone && (
              <div className="flex items-center gap-3 text-text-secondary">
                <span className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center">
                  <FiPhone />
                </span>
                {phone}
              </div>
            )}
            {location && (
              <div className="flex items-center gap-3 text-text-secondary">
                <span className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center">
                  <FiMapPin />
                </span>
                {location}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full border border-border-subtle hover:border-accent-cyan hover:text-accent-cyan hover:shadow-glow transition-all duration-300">
                <FiGithub size={18} />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full border border-border-subtle hover:border-accent-cyan hover:text-accent-cyan hover:shadow-glow transition-all duration-300">
                <FiLinkedin size={18} />
              </a>
            )}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-card p-8 space-y-4"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-border-subtle focus:border-accent-cyan outline-none transition-colors"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-border-subtle focus:border-accent-cyan outline-none transition-colors"
          />
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            placeholder="Subject"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-border-subtle focus:border-accent-cyan outline-none transition-colors"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Your Message"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-border-subtle focus:border-accent-cyan outline-none transition-colors resize-none"
          />

          <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center disabled:opacity-60">
            {status === 'loading' ? (
              <>
                <FiLoader className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                <FiSend /> Send Message
              </>
            )}
          </button>

          {status === 'success' && (
            <p className="text-emerald-400 text-sm text-center">Message sent — I'll get back to you soon!</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
