import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css"
        />
      </Head>
      <body>
        <div className="max-w-[1024px] mx-auto p-4">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
