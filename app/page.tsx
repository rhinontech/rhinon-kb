// app/page.tsx
import KB from "@/pages/KB/KB";
import { headers } from "next/headers";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  const kbId = host.split(".")[0];
  const isSubdomain = host.split(".").length > 2;

  if (!isSubdomain) {
    return (
      <div className="h-screen flex items-center justify-center">NOT FOUND</div>
    );
  }

  try {
    return <KB kbId={kbId} />;
  } catch {
    return null;
  }
}
