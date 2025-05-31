import { headers } from "next/headers";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

const LoginButton = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <Button>
      <Link href="/authentication">
        {session?.user ? "Dashboard" : "Login"}
      </Link>
    </Button>
  );
};

export default LoginButton;
