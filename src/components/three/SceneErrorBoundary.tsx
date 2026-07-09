'use client';

import { Component, ReactNode } from 'react';

interface State {
  hasError: boolean;
}

export default class SceneErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(err: unknown) {
    // eslint-disable-next-line no-console
    console.error('[SceneErrorBoundary]', err);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(0,240,255,0.12), transparent 60%), radial-gradient(circle at 70% 70%, rgba(255,45,111,0.1), transparent 60%), var(--color-bg)',
          }}
        >
          <p className="text-sm" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.2em' }}>
            3D EXPERIENCE REQUIRES A WEBGL-COMPATIBLE BROWSER
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
