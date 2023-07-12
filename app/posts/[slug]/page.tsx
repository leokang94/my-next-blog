import Title from '@/components/Title';
import { getAllPosts, getPostBySlug } from '@/lib/api';
import { markdownToHtml } from '@/lib/markdown';
import { PostInfo } from '@/types/post.type';

type PageParams = {
  slug: string;
};
type PageProps = {
  params: PageParams;
};

export async function generateStaticParams(): Promise<PageParams[]> {
  const posts = getAllPosts(['slug']);
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  const _post = getPostBySlug(slug);
  const content = await markdownToHtml(_post.content || '');
  const post: PostInfo = { ..._post, content };

  return (
    <div className="flex flex-col">
      <Title>{post.title}</Title>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
