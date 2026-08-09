import { motion } from 'framer-motion';
import { TbBrain, TbSparkles } from 'react-icons/tb';
import { resolveIcon } from '../../utils/iconResolver.js';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function AISpotlight({ aiSpotlight }) {
  if (!aiSpotlight) return null;
  const { title, subtitle, footerLine, features = [] } = aiSpotlight;

  return (
    <section id="ai-spotlight" className="section-shell items-center text-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-accent-cyan/10 blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-accent-blue/10 blur-3xl animate-pulse-glow"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <motion.div {...fadeUp} className="flex items-center justify-center gap-2 text-accent-cyan mb-4">
        <TbBrain size={28} />
        <span className="section-eyebrow !mb-0">AI Integration Spotlight</span>
      </motion.div>

      <motion.h2 {...fadeUp} className="section-heading">
        {title}
      </motion.h2>
      <motion.p {...fadeUp} className="text-text-secondary max-w-2xl mx-auto text-lg mb-14">
        {subtitle}
      </motion.p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
        {features.map((f, i) => {
          const Icon = resolveIcon(f.icon) || TbSparkles;
          return (
            <motion.div
              key={f._id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass-card p-8 hover:border-accent-cyan hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center mb-5 shadow-glow">
                <Icon size={22} className="text-[#04121e]" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{f.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          );
        })}
      </div>

      {footerLine && (
        <motion.p
          {...fadeUp}
          className="mt-14 text-accent-cyan font-medium max-w-2xl mx-auto italic"
        >
          {footerLine}
        </motion.p>
      )}
    </section>
  );
}
