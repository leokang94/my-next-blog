import PostItem from '@/components/PostItem';
import Title from '@/components/Title';
import { getAllPosts } from '@/lib/api';

async function getPosts() {
  const posts = getAllPosts();
  return posts;
}

export default async function PostPage() {
  const posts = await getPosts();

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
