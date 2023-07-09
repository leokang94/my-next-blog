import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { Plugin, unified } from 'unified';

/**
 * @reference https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/markdownToHtml.ts
 */

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkHtml as Plugin)
    .process(markdown);

  return result.toString();
}
