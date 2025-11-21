import { headers } from "next/headers";
import { checkIsLocalhost } from "@/lib/utils";
import { fetchKnowledgeBase, getArticle } from "@/services/kbServices";
import { ArticleView } from "@/components/ArticleView";
import { Metadata } from "next";
import { Theme } from "@/types/kb";

const DEFAULT_LOCAL_KB_ID = "701q3niwlyhwllafxhp49";

interface ViewArticlePageProps {
  params: { id: string };
}

async function getArticleData(articleId: string) {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  const isLocalhost = checkIsLocalhost(host);
  const kbId = isLocalhost ? DEFAULT_LOCAL_KB_ID : host.split(".")[0];
  const isSubdomain = isLocalhost || host.split(".").length > 2;

  if (!isSubdomain) {
    return null;
  }

  try {
    const [article, kbData] = await Promise.all([
      getArticle(articleId),
      fetchKnowledgeBase(kbId),
    ]);
    return { article, theme: kbData.theme };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: ViewArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getArticleData(id);
  if (!result) return {};

  const { article, theme } = result;
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || theme.seo.description || "Knowledge Base Article",
    icons: theme.favicon ? [
      {
        rel: "icon",
        url: theme.favicon,
      },
    ] : undefined,
  };
}

export default async function ArticleViewPage({ params }: ViewArticlePageProps) {
  const { id } = await params;
  const result = await getArticleData(id);

  if (!result || !result.article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg text-red-500">Article not found</div>
      </div>
    );
  }

  const { article, theme } = result;

  return (
    <ArticleView
      article={article}
      theme={theme}
    // onBack is handled by client component wrapper or we can pass a prop to handle back navigation if needed.
    // But ArticleView is a client component now, so it can use useRouter internally if we remove onBack prop or make it optional.
    // However, ArticleView expects onBack.
    // We can't pass a function from Server Component to Client Component.
    // So we need to modify ArticleView to handle back navigation internally or accept a boolean/string.
    // Or we can wrap it in a client component that handles it.
    // Actually, ArticleView is "use client", so it can use useRouter.
    // Let's update ArticleView to make onBack optional or handle it internally.
    // For now, I'll pass undefined and update ArticleView to handle it.
    // Wait, I can't pass a function.
    // I will update ArticleView to not require onBack, and use useRouter internally if onBack is missing.
    />
  );
}
