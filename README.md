# Next.js로 마크다운 블로그 만들기
> Next.js로 마크다운으로 작성한 블로그를 정적 페이지(SSG)로 작성하기

## 1. 폴더 구조 및 라우팅
- 사용자는 루트 경로의 `__posts` 폴더에 작성된 마크다운 파일(`.md`)을 작성할 수 있어야 함. 해당 파일은 마크다운 본문과 게시물에 대한 metadata를 담을 수 있어야 함. (`frontmatter`)
- 블로그에 작성된 게시물을 렌더링하는 `목록 페이지`와 개별 게시물을 렌더링하는 `상세 페이지`로 나누어 작성하기.
  - 저의 경우, `/posts` 를 목록페이지로 하고, `/posts/[id]` 를 상세 페이지로 라우팅 세팅을 했습니다. (`/` 는 `/posts` 로 redirect 되도록 `next.config.js`에 추가로 세팅을 진행했습니다.
  - 마크다운 파싱을 위해, `remark`, `rehype` 서드파티 라이브러리들을 활용했습니다.
  - syntax highlight를 위해 prism 세팅을 추가로 진행했습니다.

## 2. Next.js 12에서 지원하는 Prefetching 메서드를 적절히 사용하기
- 정적 페이지를 생성할 때 필요한 데이터 생성 -> `getStaticProps`
  - `getStaticProps`, `getServerSideProps`의 경우 prefetching 후 props를 컴포넌트에 주입하게 되는데, 이 때 props를 직렬화해서 내려주어야 합니다.
  - 하지만 `Date` 객체의 경우 직렬화가 불가능해 `JSON.parse(JSON.stringify(data))`의 식으로 매 SSR, SSG 페이지별로 세팅해야 하는데, 이런 불편함을 해소하기 위해 [superjson](https://github.com/blitz-js/superjson)을 적용했습니다. (babel 세팅)
- 각 포스트를 그려줄 상세 페이지 경로를 생성 -> `getStaticPaths`

## 3. 추가 정보
- Typescript 사용
- tailwindcss 사용
- vercel 활용해 배포 진행 - https://my-next-blog-lovat.vercel.app/
- prism theme - [dracula](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-dracula.css)
