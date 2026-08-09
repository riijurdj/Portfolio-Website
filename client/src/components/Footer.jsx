export default function Footer({ text }) {
  return (
    <footer className="py-8 text-center text-sm text-text-muted border-t border-border-subtle">
      {text || `Built with passion by Riiju Jagetiya © ${new Date().getFullYear()}`}
    </footer>
  );
}
