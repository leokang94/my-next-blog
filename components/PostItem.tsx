'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { PostInfo } from '@/types/post.type';

type PostItemProps = {
  post: PostInfo;
};
export default function PostItem({ post }: PostItemProps) {
  const router = useRouter();

  const handleClick = (slug: string) => () => {
    router.push(`/posts/${slug}`);
  };

  return (
    <div
      className="p-4 bg-zinc-700 rounded-md text-zinc-300 cursor-pointer flex justify-between items-center hover:bg-zinc-600 transition-colors"
      onClick={handleClick(post.slug)}
    >
      <span className="text-xl">{post.title}</span>
      <span className="text-zinc-400">
        {dayjs(post.date).format('YYYY-MM-DD')}
      </span>
    </div>
  );
}
