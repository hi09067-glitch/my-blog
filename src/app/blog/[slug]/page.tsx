import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = PageProps<"/blog/[slug]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post?.published) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post?.published) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-14">
      <Link href="/" className="mb-10 inline-block text-sm text-blue-600 hover:underline">
        ← 글 목록으로
      </Link>
      <header className="mb-10 border-b border-slate-200 pb-8">
        <time dateTime={post.date} className="mb-3 block text-sm text-slate-500">
          {post.date}
        </time>
        <h1 className="mb-4 text-4xl font-bold leading-tight">{post.title}</h1>
        <p className="mb-5 text-slate-600">{post.description}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded bg-slate-100 px-2 py-1 text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </header>
      <article className="prose prose-slate max-w-none">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>
    </main>
  );
}
