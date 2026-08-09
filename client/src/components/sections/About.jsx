import { motion } from 'framer-motion';
import Counter from '../Counter.jsx';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function About({ about }) {
  if (!about) return null;
  const { story, photo, stats = [] } = about;

  return (
    <section id="about" className="section-shell">
      <motion.p {...fadeUp} className="section-eyebrow text-center lg:text-left">
        Who I Am
      </motion.p>
      <motion.h2 {...fadeUp} className="section-heading text-center lg:text-left">
        About Me
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-12 items-start mt-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="w-full max-w-sm mx-auto lg:mx-0 aspect-square rounded-2xl overflow-hidden glass-card p-2 hover:border-accent-cyan hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-full h-full rounded-xl overflow-hidden bg-bg-secondary flex items-center justify-center">
              {photo ? (
                <img src={photo} alt="Riiju Jagetiya" className="w-full h-full object-cover" />
              ) : (
                <span className="text-6xl font-extrabold gradient-text">RJ</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat._id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="glass-card p-4 text-center hover:border-accent-cyan hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-extrabold gradient-text">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-text-muted mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card p-8 hover:border-accent-cyan hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {story}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
