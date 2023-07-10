import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import invariant from 'tiny-invariant';

import { PostInfo } from '@/types/post.type';

/**
 * @reference https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/api.ts
 */

type PostFields = keyof PostInfo;

const POSTS_DIRECTORY = join(process.cwd(), '__posts');

/**
 * posts 디렉토리 내 파일들의 slug를 가져온다.
 * @returns
 */
export function getPostSlugs() {
  return fs.readdirSync(POSTS_DIRECTORY);
}

/**
 * slug에 해당하는 post를 가져온다. 이 때 fields에 해당하는 정보들만 가져온다.
 * @param slug
 * @param fields
 * @returns items
 */
export function getPostBySlug(
  slug: string,
  fields: PostFields[] = []
): PostInfo {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(POSTS_DIRECTORY, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // invariants
  const mandatoryFrontmatterList = ['title', 'date'];
  mandatoryFrontmatterList.forEach((field) => {
    invariant(
      data[field],
      `블로그 포스트 frontmatter에는 '${field}'가 필수입니다.`
    );
  });

  const postInfo: PostInfo = {
    slug: '',
    title: '',
    content: '',
    date: new Date(),
  };

  if (fields.length === 0) {
    postInfo.slug = realSlug;
    postInfo.content = content;
    Object.entries(data).forEach(([key, value]) => {
      postInfo[key as keyof PostInfo] = value;
    });

    return postInfo;
  }

  // 필요한 field들만 item에 세팅
  fields.forEach((field) => {
    if (field === 'slug') {
      postInfo[field] = realSlug;
    }
    if (field === 'content') {
      postInfo[field] = content;
    }
    if (data[field]) {
      postInfo[field] = data[field];
    }
  });

  return postInfo;
}

/**
 * 모든 post를 가져온다.
 * @param fields
 * @returns
 */
export function getAllPosts(fields: PostFields[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
