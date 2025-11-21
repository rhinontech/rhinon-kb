import KB from "@/pages/KB/KB";
import { headers } from "next/headers";
import { checkIsLocalhost } from "@/lib/utils";
import { fetchKnowledgeBase } from "@/services/kbServices";
import { Metadata } from "next";

const DEFAULT_LOCAL_KB_ID = "701q3niwlyhwllafxhp49";

async function getKBData() {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  const isLocalhost = checkIsLocalhost(host);
  const kbId = isLocalhost ? DEFAULT_LOCAL_KB_ID : host.split(".")[0];
  const isSubdomain = isLocalhost || host.split(".").length > 2;

  if (!isSubdomain) {
    return null;
  }

  try {
    const data = await fetchKnowledgeBase(kbId);
    return { data, kbId };
  } catch {
    return { data: null, kbId };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const result = await getKBData();
  if (!result || !result.data) return {};

  const { theme } = result.data;
  return {
    title: theme.seo.title || "Rhinon Tech | Knowledge Base",
    description: theme.seo.description || "Knowledge Base",
    icons: theme.favicon ? [
      {
        rel: "icon",
        url: theme.favicon,
      },
    ] : undefined,
  };
}

export default async function Home() {
  const result = await getKBData();

  if (!result) {
    return (
      <div className="h-screen flex items-center justify-center">NOT FOUND</div>
    );
  }

  const { data, kbId } = result;

  return <KB kbId={kbId} initialData={data} />;
}
