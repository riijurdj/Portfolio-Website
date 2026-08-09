import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, themes } = useTheme();
  const active = themes.find((t) => t.id === theme) || themes[0];
  const Icon = active.icon;

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch theme (current: ${active.label})`}
      whileTap={{ scale: 0.85 }}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle overflow-hidden
        hover:border-accent-cyan hover:shadow-glow transition-colors duration-300 ${className}`}
    >
      <motion.span
        key={`ripple-${theme}`}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-cyan to-accent-blue"
        initial={{ scale: 0, opacity: 0.55 }}
        animate={{ scale: 2.4, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative z-10 flex items-center justify-center"
        >
          <Icon size={18} />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
