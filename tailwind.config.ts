import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        cyan: 'var(--color-accent-cyan)',
        magenta: 'var(--color-accent-magenta)',
        purple: 'var(--color-accent-purple)',
      },
      fontFamily: {
        sans: ['var(--font-space)', 'system-ui', 'sans-serif'],
        jp: ['var(--font-jp)', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
