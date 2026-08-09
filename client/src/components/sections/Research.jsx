import { motion } from 'framer-motion';
import { FiAward, FiBookOpen } from 'react-icons/fi';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function Research({ research }) {
  if (!research || !research.title) return null;
  const {
    title,
    journal,
    volume,
    publishedDate,
    publisher,
    doi,
    authors = [],
    abstractSnippet,
    tags = [],
    paperUrl,
    badge,
  } = research;

  return (
    <section id="research" className="section-shell items-center">
      <motion.p {...fadeUp} className="section-eyebrow text-center w-full">
        Contribution to Research
      </motion.p>
      <motion.h2 {...fadeUp} className="section-heading text-center w-full mb-12">
        Publication
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card relative max-w-3xl w-full mx-auto p-8 sm:p-10 border-t-4 border-t-accent-cyan"
      >
        {badge && (
          <span className="absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            {badge}
          </span>
        )}

        <FiBookOpen className="text-accent-cyan mb-4" size={28} />
        <h3 className="text-xl sm:text-2xl font-bold leading-snug mb-4 pr-16">{title}</h3>

        <div className="text-sm text-text-muted space-y-1 mb-5">
          <p>
            <span className="font-semibold text-text-secondary">Journal:</span> {journal}
          </p>
          <p>
            <span className="font-semibold text-text-secondary">{volume}</span> · Published{' '}
            {publishedDate}
          </p>
          <p>
            <span className="font-semibold text-text-secondary">Publisher:</span> {publisher}
          </p>
          <p>
            <span className="font-semibold text-text-secondary">DOI:</span> {doi}
          </p>
        </div>

        <p className="text-sm text-text-secondary mb-3">
          <span className="font-semibold">Authors:</span>{' '}
          {authors.map((a, i) => (
            <span key={a} className={a === 'Riiju Jagetiya' ? 'gradient-text font-semibold' : ''}>
              {a}
              {i < authors.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>

        <p className="text-text-secondary text-sm leading-relaxed mb-6">{abstractSnippet}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {paperUrl && (
          <a href={paperUrl} target="_blank" rel="noreferrer" className="btn-primary">
            <FiAward /> Read Paper
          </a>
        )}
      </motion.div>
    </section>
  );
}
