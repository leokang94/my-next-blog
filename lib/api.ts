import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import invariant from 'tiny-invariant';

/**
 * @reference https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/api.ts
 */

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
export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(POSTS_DIRECTORY, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // invariants
  const mandatoryFields = ['title', 'date'];
  mandatoryFields.forEach((field) => {
    invariant(data[field], `Post에는 '${field}'가 필수입니다.`);
  });

  type Items = Record<string, string>;
  const items: Items = {};

  if (fields.length === 0) {
    items.slug = realSlug;
    items.content = content;
    Object.entries(data).forEach(([key, value]) => {
      items[key] = value;
    });

    return items;
  }

  // 필요한 field들만 item에 세팅
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

/**
 * 모든 post를 가져온다.
 * @param fields
 * @returns
 */
export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
