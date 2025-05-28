import { headers } from "next/headers";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button>
        <Link href="/authentication">{session?.user ? "Dashboard" : "Login"}</Link>
      </Button>
    </div>
  );
}
