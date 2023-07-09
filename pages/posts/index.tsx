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
  const posts = getAllPosts();

  return {
    props: { posts },
  };
};
