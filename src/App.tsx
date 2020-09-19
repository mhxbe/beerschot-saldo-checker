import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ResetCss, Main, Content } from './App.styles';
import Header from './common/Header';
import ErrorFallback, { errorHandler } from './common/ErrorFallback';
import Home from './Home';

const App: React.FC = () => {
  return (
    <>
      <ResetCss />
      <Header />
      <Main role="main">
        <Content>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={errorHandler}
          >
            <Home />
          </ErrorBoundary>
        </Content>
      </Main>
    </>
  );
};

export default App;
