import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function Projects({ projects = [] }) {
  if (!projects.length) return null;
  const sorted = [...projects].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="projects" className="section-shell">
      <motion.p {...fadeUp} className="section-eyebrow text-center">
        Things I've Built
      </motion.p>
      <motion.h2 {...fadeUp} className="section-heading text-center mb-14">
        Projects
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        {sorted.map((p, i) => (
          <motion.div
            key={p._id || i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="glass-card h-full p-7 rounded-2xl hover:border-accent-cyan hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            {p.image && (
              <div className="rounded-xl overflow-hidden mb-5 aspect-video bg-bg-secondary">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{p.name}</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {(p.techStack || []).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {p.githubUrl && (
                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn-outline !py-2 !px-4 text-sm">
                  <FiGithub size={15} /> Code
                </a>
              )}
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn-primary !py-2 !px-4 text-sm">
                  <FiExternalLink size={15} /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
