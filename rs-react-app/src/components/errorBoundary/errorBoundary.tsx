import React, { type ReactNode } from 'react';

import PageWrapper from '../pageWrapper/pageWrapper';

import ErrorBoundaryMsg from '../errorBoundaryMsg/errorBoundaryMsg';

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

 constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error Boundary has caught an error: ", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <PageWrapper>
          <ErrorBoundaryMsg></ErrorBoundaryMsg>
        </PageWrapper>
      )
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;