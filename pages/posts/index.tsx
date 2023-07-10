import type { GetStaticProps } from 'next';
import Link from 'next/link';

import PostItem from '@/components/PostItem';
import Title from '@/components/Title';
import { getAllPosts } from '@/lib/api';
import { PostInfo } from '@/types/post.type';

type PostProps = {
  posts: PostInfo[];
};

export default function Posts({ posts }: PostProps) {
  return (
    <div>
      <Title>Post</Title>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostItem post={post} />
          </li>
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
