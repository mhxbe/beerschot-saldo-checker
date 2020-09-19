import * as React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ResetCss, Main, Content } from './App.styles';
import Header from './common/Header';
import ErrorFallback, { errorHandler } from './common/ErrorFallback';

const Home = React.lazy(
  () => import(/* webpackChunkName: 'home' */ './pages/Home')
);
const About = React.lazy(
  () => import(/* webpackChunkName: 'about' */ './pages/About')
);
const PageNotFound = React.lazy(
  () => import(/* webpackChunkName: '404' */ './pages/404')
);

const App: React.FC = () => {
  return (
    <>
      <ResetCss />
      <Header />
      <Main role="main">
        <Content>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <ErrorBoundary
                    key="home"
                    FallbackComponent={ErrorFallback}
                    onError={errorHandler}
                  >
                    <Home />
                  </ErrorBoundary>
                )}
              />
              <Route
                path="/about"
                render={() => (
                  <ErrorBoundary
                    key="about"
                    FallbackComponent={ErrorFallback}
                    onError={errorHandler}
                  >
                    <About />
                  </ErrorBoundary>
                )}
              />
              <Route
                path="/404"
                component={(props: RouteComponentProps) => (
                  <PageNotFound {...props} />
                )}
              />
              <Redirect to="/404" />
            </Switch>
          </React.Suspense>
        </Content>
      </Main>
    </>
  );
};

export default App;
