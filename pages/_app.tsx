import '@/styles/base.scss';

import TheFooter from '@/components/the-footer/TheFooter';
import TheHeader from '@/components/the-header/TheHeader';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TheHeader />

      <main className="page wrapper">
        <Component {...pageProps} />
      </main>

      <TheFooter />
    </QueryClientProvider>
  );
};

export default App;
