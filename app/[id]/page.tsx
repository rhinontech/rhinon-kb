"use client";

import ArticleViewer from "../../pages/ArticleViewer/ArticleViewer";

interface ViewArticlePageProps {
  params: { id: string };
}

export default function ArticleViewPage({ params }: ViewArticlePageProps) {
  const articleId = params.id;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10 bg-white">
      <ArticleViewer articleId={articleId} />
    </div>
  );
}
