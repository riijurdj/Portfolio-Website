import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin } from 'react-icons/fi';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function Experience({ experience = [] }) {
  if (!experience.length) return null;
  const sorted = [...experience].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="experience" className="section-shell">
      <motion.p {...fadeUp} className="section-eyebrow text-center">
        Where I've Grown
      </motion.p>
      <motion.h2 {...fadeUp} className="section-heading text-center mb-16">
        Experience
      </motion.h2>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan via-accent-blue to-transparent lg:-translate-x-1/2" />

        <div className="space-y-12">
          {sorted.map((exp, i) => {
            const alignRight = i % 2 === 1;
            return (
              <div key={exp._id || i} className="relative lg:grid lg:grid-cols-2 lg:gap-10">
                <span className="absolute left-4 lg:left-1/2 top-2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-accent-cyan to-accent-blue shadow-glow -translate-x-1/2 z-10" />

                <motion.div
                  initial={{ opacity: 0, x: alignRight ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`pl-12 lg:pl-0 ${
                    alignRight ? 'lg:col-start-2' : 'lg:col-start-1 lg:text-right'
                  }`}
                >
                  <div className="glass-card p-6 hover:shadow-glow transition-shadow duration-300">
                    <div
                      className={`flex items-center gap-2 text-text-muted text-sm mb-2 ${
                        alignRight ? '' : 'lg:justify-end'
                      }`}
                    >
                      <FiMapPin size={14} /> {exp.location}
                    </div>
                    <h3 className="text-xl font-bold flex items-center gap-2 mb-1">
                      <FiBriefcase className="text-accent-cyan shrink-0" />
                      {exp.role}
                    </h3>
                    <p className="gradient-text font-semibold mb-1">{exp.company}</p>
                    <p className="text-text-muted text-sm mb-4">{exp.duration}</p>

                    <ul className="space-y-2 text-left">
                      {(exp.achievements || []).map((a, idx) => (
                        <li key={idx} className="text-sm text-text-secondary flex gap-2">
                          <span className="text-accent-cyan mt-1">▹</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
