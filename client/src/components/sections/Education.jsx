import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { TbSchool } from 'react-icons/tb';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function Education({ education = [], certifications = [] }) {
  if (!education.length && !certifications.length) return null;
  const sortedEdu = [...education].sort((a, b) => (a.order || 0) - (b.order || 0));
  const sortedCerts = [...certifications].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="education" className="section-shell">
      <motion.p {...fadeUp} className="section-eyebrow text-center">
        Foundations
      </motion.p>
      <motion.h2 {...fadeUp} className="section-heading text-center mb-14">
        Education &amp; Certifications
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <h3 className="text-lg font-bold text-text-muted uppercase tracking-wide flex items-center gap-2">
            <TbSchool className="text-accent-cyan" /> Education
          </h3>
          {sortedEdu.map((e, i) => (
            <div key={e._id || i} className="glass-card p-6 hover:shadow-glow transition-shadow duration-300">
              <h4 className="font-bold text-lg mb-1">{e.institution}</h4>
              <p className="gradient-text font-semibold mb-1">{e.degree}</p>
              <p className="text-text-muted text-sm">{e.duration}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5"
        >
          <h3 className="text-lg font-bold text-text-muted uppercase tracking-wide flex items-center gap-2">
            <FiAward className="text-accent-cyan" /> Certifications
          </h3>
          {sortedCerts.map((c, i) => (
            <div key={c._id || i} className="glass-card p-6 hover:shadow-glow transition-shadow duration-300">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h4 className="font-bold text-lg">{c.name}</h4>
                {c.status === 'In Progress' && (
                  <span className="shrink-0 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    In Progress
                  </span>
                )}
              </div>
              <p className="gradient-text font-semibold mb-1">{c.issuer}</p>
              <p className="text-text-muted text-sm">{c.duration}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
