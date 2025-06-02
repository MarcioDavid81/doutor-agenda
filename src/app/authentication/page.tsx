import { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import LoginForm from "./_components/login-form";
import SignUpForm from "./_components/sign-up-form";

export const metadata: Metadata = {
  title: "Autenticação",
  keywords: [
    "agendamento de consultas",
    "gestão de clínic",
    "controle de agenda de médicos e pacientes",
  ],
  description: "O seu sistema de gestão de agendamento de consultas",
  authors: [
    { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
  ],
};

const AuthenticationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex md:flex-row h-screen w-screen items-center justify-center">
      <div className="flex flex-col h-screen w-full items-center justify-center">
        <Image
          src="/s-logo.svg"
          alt="Logo"
          width={200}
          height={400}
          className="mb-8"
        />
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Criar Conta</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
      <div className="h-screen w-full hidden lg:block content-end bg-[url('/bg.jpg')] bg-cover bg-center pb-4">
        <p className="mt-4 text-center text-sm text-white">
          Ao continuar, você concorda com os{" "}
          <a
            href="/terms"
            className="hover:text-primary/80 text-white underline"
          >
            Termos de Serviço
          </a>{" "}
          e a{" "}
          <a
            href="/privacy"
            className="hover:text-primary/80 text-white underline"
          >
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthenticationPage;
