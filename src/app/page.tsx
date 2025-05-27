import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Button>
        <Link href="/authentication">Authentication</Link>
      </Button>
    </div>
  );
}
