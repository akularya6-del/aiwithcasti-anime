export default function Divider({ number, title }: { number: string; title?: string }) {
  return (
    <div className="w-full py-16 px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center gap-3">
        <div
          className="text-[0.65rem]"
          style={{ letterSpacing: '0.3em', color: 'var(--color-text-muted)' }}
        >
          {number}
        </div>
        {title && (
          <div
            className="text-[0.7rem] uppercase"
            style={{ letterSpacing: '0.25em', color: 'var(--color-accent-cyan)' }}
          >
            {title}
          </div>
        )}
        <div
          className="h-px w-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.4), transparent)',
          }}
        />
      </div>
    </div>
  );
}
