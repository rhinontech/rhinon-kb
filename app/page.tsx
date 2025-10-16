// app/page.tsx
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
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1>Subdomain: {kbId}</h1>
        <p>KB ID: {kbId}</p>
      </div>
    );
  } catch {
    return null;
  }
}
