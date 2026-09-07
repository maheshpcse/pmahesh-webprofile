import { Component, type ReactNode } from 'react';

interface Props {
  onError: () => void;
  children: ReactNode;
}

/** If WebGL fails at runtime (context loss, driver quirks) we drop straight into the portfolio. */
export class IntroErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('[intro] 3D intro failed, skipping to content.', error);
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
