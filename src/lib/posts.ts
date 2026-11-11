import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
  content: string;
};

export function getPostBySlug(slug: string): Post | null {
  // A slug is also a filename, so reject path separators and traversal.
  if (!/^[a-z0-9_-]+$/.test(slug)) {
    return null;
  }

  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date ?? "");

  return {
    slug,
    title: String(data.title ?? slug),
    date,
    description: String(data.description ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    published: data.published === true,
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => getPostBySlug(filename.replace(/\.mdx$/, "")))
    .filter((post): post is Post => post !== null && post.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}
