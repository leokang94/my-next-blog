import rehypeFormat from 'rehype-format';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkPrism from 'remark-prism';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

/**
 * @reference https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/markdownToHtml.ts
 * @reference syntax-highlighting with prism: https://ahmadrosid.com/blog/using-remark-prism-nextjs
 */

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkPrism)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
