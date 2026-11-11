# My Dev Blog

Next.js + MDX로 만든 파일 기반 개인 블로그입니다. 데이터베이스 없이 `content/posts/*.mdx`를 GitHub에서 관리하며, Vercel 빌드에서 공개 게시글의 정적 페이지를 생성합니다.

## 로컬 실행

Node.js를 설치한 뒤 프로젝트 루트에서 실행합니다.

```bash
npm install
npm run dev
```

`http://localhost:3000`에서 목록을, `/blog/hello-world`에서 글 본문을 확인할 수 있습니다.

## 게시글 작성

`content/posts/`에 소문자, 숫자, 하이픈으로 된 이름의 `.mdx` 파일을 추가합니다. 파일명이 URL의 slug가 됩니다. 예를 들어 `my-new-post.mdx`는 `/blog/my-new-post`가 됩니다.

```mdx
---
title: "새 게시글"
date: "2026-11-11"
description: "게시글 한 줄 소개"
tags:
  - Next.js
published: true
---

# 제목

Markdown과 MDX로 본문을 작성합니다.
```

`published: false`인 글은 목록과 상세 페이지에서 공개되지 않습니다. 이미지는 `public/images/`에 넣고 `![설명](/images/파일명.png)`으로 참조합니다. MDX에는 실행 가능한 컴포넌트 코드가 들어갈 수 있으므로 신뢰하는 글만 병합하세요.

## 배포

```bash
npm run lint
npm run build
```

GitHub 저장소를 Vercel 프로젝트에 연결하고 Framework Preset을 Next.js로 설정한 뒤 배포합니다. DB나 API 키는 필요하지 않습니다. Production 브랜치에 새 글을 Push 또는 Merge하면 Vercel에서 다시 빌드합니다.

헤더에 개인 GitHub 링크를 표시하려면 Vercel과 로컬 환경에 `NEXT_PUBLIC_GITHUB_URL=https://github.com/사용자명`을 설정하세요. 설정하지 않으면 링크는 표시되지 않습니다.

## 구조

```text
content/posts/          MDX 게시글
public/images/          게시글 이미지
src/app/                홈, 공통 레이아웃, 게시글 상세 경로
src/lib/posts.ts        게시글 읽기, 공개 필터, 최신순 정렬
```
