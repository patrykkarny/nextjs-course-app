/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ThemeProvider } from 'theme-ui';
import { AppProps } from 'next/app';

import theme from '../theme';
import Nav from '../src/components/nav';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme as any}>
      <div>
        <Nav />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
