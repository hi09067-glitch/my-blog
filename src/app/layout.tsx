import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "My Dev Blog",
    template: "%s | My Dev Blog",
  },
  description: "개발 경험과 기술을 기록하는 개인 블로그",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <header className="border-b border-slate-200">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
            <Link href="/" className="text-xl font-bold">
              DevLog.
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              {process.env.NEXT_PUBLIC_GITHUB_URL && (
                <a
                  href={process.env.NEXT_PUBLIC_GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  GitHub
                </a>
              )}
            </div>
          </nav>
        </header>
        {children}
        <footer className="border-t border-slate-200 py-10 text-center text-sm text-slate-500">
          Built with Next.js · MDX · Vercel
        </footer>
      </body>
    </html>
  );
}
