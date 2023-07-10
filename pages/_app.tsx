// import 'prismjs/themes/prism-tomorrow.css';
// import 'dracula-prism/dist/css/dracula-prism.min.css';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@/styles/prism-dracula.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
