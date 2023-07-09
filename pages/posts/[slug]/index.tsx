import type { GetStaticPaths, GetStaticProps } from 'next';

import { getAllPosts, getPostBySlug } from '@/lib/api';
import { markdownToHtml } from '@/lib/markdown';

type PostDetailProps = {
  post: any;
};

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <div className="flex flex-col">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

type PathParams = {
  slug: string;
};

export const getStaticProps: GetStaticProps<
  PostDetailProps,
  PathParams
> = async ({ params }) => {
  const _post = getPostBySlug(params!.slug);
  const content = await markdownToHtml(_post.content || '');

  const post = JSON.parse(JSON.stringify({ ..._post, content }));

  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};
