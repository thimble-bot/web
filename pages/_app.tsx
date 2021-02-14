import '@/styles/base.scss';

import TheFooter from '@/components/the-footer/TheFooter';
import TheHeader from '@/components/the-header/TheHeader';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as AuthProvider } from 'next-auth/client';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Router from 'next/router';
import NProgress from 'nprogress';

const queryClient = new QueryClient();

config.autoAddCss = false;

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeComplete', NProgress.done);
Router.events.on('routeChangeError', NProgress.done);

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <TheHeader />

        <main className="page wrapper">
          <Component {...pageProps} />
        </main>

        <TheFooter />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
