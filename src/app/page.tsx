import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <section className="mb-14">
        <p className="mb-3 text-sm font-semibold tracking-widest text-blue-600">
          PERSONAL DEV BLOG
        </p>
        <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
          기록하는 개발자
        </h1>
        <p className="text-lg leading-8 text-slate-600">
          개발하면서 배운 것과 문제 해결 과정을 기록하는 공간입니다.
        </p>
      </section>

      <section aria-labelledby="latest-posts">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 id="latest-posts" className="text-2xl font-bold">
            최신 게시글
          </h2>
          <span className="text-sm text-slate-500">{posts.length} posts</span>
        </div>

        {posts.length === 0 ? (
          <p className="rounded-xl border border-slate-200 p-6 text-slate-500">
            아직 등록된 게시글이 없습니다.
          </p>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="block rounded-xl border border-slate-200 p-6 transition hover:border-blue-400 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <time dateTime={post.date} className="mb-2 block text-sm text-slate-500">
                  {post.date}
                </time>
                <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
                <p className="mb-4 text-slate-600">{post.description}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
