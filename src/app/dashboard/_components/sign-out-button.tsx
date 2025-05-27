"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const SignOutButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              toast.success("Você saiu da sua conta!");
              router.push("/authentication");
            },
          },
        })
      }
    >
      Sair
    </Button>
  );
};

export default SignOutButton;
