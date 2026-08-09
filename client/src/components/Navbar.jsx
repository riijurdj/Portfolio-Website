import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle.jsx';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'ai-spotlight', label: 'AI' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ sectionsVisibility = {}, name = 'Riiju Jagetiya' }) {
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const visibilityKey = (id) => (id === 'ai-spotlight' ? 'aiSpotlight' : id);
  const links = NAV_LINKS.filter((l) => sectionsVisibility[visibilityKey(l.id)] !== false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links.length]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-card backdrop-blur-xl !rounded-none border-x-0 border-t-0 shadow-card' : ''
      }`}
    >
      <nav className="flex items-center justify-between px-6 sm:px-10 lg:px-24 py-4">
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 font-bold text-lg"
        >
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center text-[#04121e] text-sm font-extrabold shadow-glow">
            RJ
          </span>
          <span className="hidden sm:inline text-text-primary">{name}</span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                active === l.id
                  ? 'text-accent-cyan bg-accent-cyan/10'
                  : 'text-text-secondary hover:text-accent-cyan'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-border-subtle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-card !rounded-none border-x-0 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active === l.id ? 'text-accent-cyan bg-accent-cyan/10' : 'text-text-secondary'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
