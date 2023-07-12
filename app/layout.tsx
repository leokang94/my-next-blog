// `app` directory는 꼭 root layout을 포함해야 함.
// root layout은 무조건 `<html>`과, `<body>`를 포함해야 함. (Next.js가 자동으로 생성해주지 않기 때문)
// 이는 Next.js 12의 `pages/_app.tsx`, `pages/_document.tsx`를 대체함.
import { Metadata } from 'next';

import '@/styles/globals.css';
import '@/styles/prism-dracula.css';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcom to Next.js',
};

type RootLayoutProps = {
  children: React.ReactNode;
};
export default function RootLayout({
  // Layout은 children props를 필수적으로 가져야 함.
  // 이 children은 nested layouts 또는 pages로 채워진다.
  children,
}: RootLayoutProps) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css"
        />
      </head>
      <body>
        <div className="max-w-[1024px] mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
