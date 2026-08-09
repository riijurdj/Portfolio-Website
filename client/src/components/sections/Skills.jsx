import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resolveIcon } from '../../utils/iconResolver.js';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function Skills({ skills = [] }) {
  const [activeTab, setActiveTab] = useState(0);
  if (!skills.length) return null;
  const activeCategory = skills[activeTab] || skills[0];

  return (
    <section id="skills" className="section-shell">
      <motion.p {...fadeUp} className="section-eyebrow text-center">
        What I Work With
      </motion.p>
      <motion.h2 {...fadeUp} className="section-heading text-center">
        Skills &amp; Technologies
      </motion.h2>

      <motion.div
        {...fadeUp}
        className="flex flex-wrap justify-center gap-2 mt-8 mb-10"
      >
        {skills.map((cat, i) => (
          <button
            key={cat._id || cat.category}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === i
                ? 'bg-gradient-to-r from-accent-cyan to-accent-blue text-[#04121e] shadow-glow'
                : 'glass-card text-text-secondary hover:text-accent-cyan'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.category}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          {(activeCategory.skills || []).map((skill, i) => {
            const Icon = resolveIcon(skill.icon);
            return (
              <motion.span
                key={skill._id || skill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="skill-pill"
              >
                {Icon && <Icon size={16} className="text-accent-cyan" />}
                {skill.name}
              </motion.span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
