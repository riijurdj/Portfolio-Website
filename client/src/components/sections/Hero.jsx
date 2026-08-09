import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Hero({ hero }) {
  if (!hero) return null;
  const { name, titles = [], tagline, profilePhoto, resumeUrl, resumeFile, socialLinks = {} } = hero;
  const resumeHref = resumeFile || resumeUrl || '/resume.pdf';

  const typeSequence = titles.flatMap((t) => [t, 2000]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="section-shell items-center text-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-bg-primary" />
      <div className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-accent-cyan/10 blur-3xl animate-float -z-10" />
      <div
        className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full bg-accent-blue/10 blur-3xl animate-float -z-10"
        style={{ animationDelay: '1.5s' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mx-auto mb-8 relative w-36 h-36 sm:w-44 sm:h-44"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-cyan to-accent-blue blur-md opacity-70 animate-pulse-glow" />
        <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-br from-accent-cyan to-accent-blue">
          <div className="w-full h-full rounded-full overflow-hidden bg-bg-secondary flex items-center justify-center">
            {profilePhoto ? (
              <img src={profilePhoto} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl sm:text-5xl font-extrabold gradient-text">RJ</span>
            )}
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4"
      >
        {name}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="h-9 sm:h-10 mb-6"
      >
        <span className="text-lg sm:text-2xl font-semibold gradient-text">
          <TypeAnimation
            sequence={typeSequence.length ? typeSequence : ['Full Stack Developer', 2000]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            cursor
          />
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="max-w-xl mx-auto text-text-secondary text-base sm:text-lg italic mb-10"
      >
        {tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-10"
      >
        <button onClick={scrollToProjects} className="btn-primary">
          View My Work <FiArrowDown />
        </button>
        <a href={resumeHref} download={`${name || 'Resume'}.pdf`} className="btn-outline">
          Download Resume <FiDownload />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="flex items-center justify-center gap-5"
      >
        {socialLinks.github && (
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-border-subtle hover:border-accent-cyan hover:text-accent-cyan hover:shadow-glow transition-all duration-300"
          >
            <FiGithub size={19} />
          </a>
        )}
        {socialLinks.linkedin && (
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-border-subtle hover:border-accent-cyan hover:text-accent-cyan hover:shadow-glow transition-all duration-300"
          >
            <FiLinkedin size={19} />
          </a>
        )}
        {socialLinks.email && (
          <a
            href={`mailto:${socialLinks.email}`}
            aria-label="Email"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-border-subtle hover:border-accent-cyan hover:text-accent-cyan hover:shadow-glow transition-all duration-300"
          >
            <FiMail size={19} />
          </a>
        )}
      </motion.div>
    </section>
  );
}
