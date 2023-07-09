import type { GetStaticProps } from 'next';

import { getAllPosts } from '@/lib/api';

type PostProps = {
  posts: any[];
};

export default function Posts({ posts }: PostProps) {
  return (
    <div>
      <h1>Post</h1>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.slug}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostProps> = async () => {
  // Date 객체의 경우 직렬화가 안되기 때문에, json 객체로 파싱 후 전달
  const posts = JSON.parse(JSON.stringify(getAllPosts()));
  return {
    props: { posts },
  };
};
