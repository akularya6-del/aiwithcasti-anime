export default function Footer() {
  return (
    <footer
      className="w-full py-10 px-6"
      style={{
        background: '#070710',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          © 2026 AIWITHCASTI
        </div>
        <div
          className="text-xs"
          style={{ color: 'var(--color-text-muted)', letterSpacing: '0.15em' }}
        >
          Built with Three.js · GSAP · Lenis
        </div>
        <div className="flex items-center gap-3">
          {['X', 'GH', 'YT'].map((label) => (
            <a
              key={label}
              href="#"
              className="interactive w-8 h-8 rounded-full flex items-center justify-center text-[0.6rem] transition-colors hover:text-cyan"
              data-cursor="expand"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.1em',
              }}
              aria-label={label}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
