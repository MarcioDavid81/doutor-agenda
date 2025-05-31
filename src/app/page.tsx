"use client";

import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Star,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-50">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-gray-200/20 bg-white/90 shadow-sm backdrop-blur-md">
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/">
            <Image
              src="/s-logo.svg"
              alt="Logo"
              width={156}
              height={38}
              priority
            />
          </Link>

          <div className="hidden items-center space-x-8 md:flex">
            <a
              href="#recursos"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Recursos
            </a>
            <a
              href="#beneficios"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Benefícios
            </a>
            <a
              href="#depoimentos"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Depoimentos
            </a>
            <a
              href="#contato"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Contato
            </a>
            <Link href="/authentication">
              <button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white transition-all duration-300 hover:shadow-lg">
                Começar Agora
              </button>
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 bg-white md:hidden">
            <div className="space-y-4 px-6 py-4">
              <a
                href="#recursos"
                className="block text-gray-700 hover:text-blue-600"
              >
                Recursos
              </a>
              <a
                href="#beneficios"
                className="block text-gray-700 hover:text-blue-600"
              >
                Benefícios
              </a>
              <a
                href="#depoimentos"
                className="block text-gray-700 hover:text-blue-600"
              >
                Depoimentos
              </a>
              <a
                href="#contato"
                className="block text-gray-700 hover:text-blue-600"
              >
                Contato
              </a>
              <Link href="/authentication">
                <button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white transition-all duration-300 hover:shadow-lg">
                  Começar Agora
                </button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-24 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl leading-tight font-bold md:text-6xl">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Revolucione
                  </span>
                  <br />
                  <span className="text-gray-900">
                    seus agendamentos médicos
                  </span>
                </h1>
                <p className="text-xl leading-relaxed text-gray-600">
                  Simplifique a gestão de consultas com nossa plataforma
                  intuitiva. Mais tempo para cuidar dos pacientes, menos tempo
                  com papelada.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/authentication">
                  <button className="group flex transform items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <span>Começar Gratuitamente</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
                <button className="rounded-full border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:border-blue-600 hover:text-blue-600">
                  Ver Demonstração
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Grátis por 30 dias</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Sem cartão de crédito</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rotate-6 transform rounded-3xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-20"></div>
              <div className="relative transform rounded-3xl bg-white p-8 shadow-2xl transition-transform duration-300 hover:-translate-y-2">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Próximas Consultas
                    </h3>
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        patient: "Maria Silva",
                        time: "14:30",
                        type: "Cardiologia",
                      },
                      {
                        patient: "João Santos",
                        time: "15:15",
                        type: "Clínica Geral",
                      },
                      {
                        patient: "Ana Costa",
                        time: "16:00",
                        type: "Dermatologia",
                      },
                    ].map((appointment, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-blue-50"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-white">
                          {appointment.patient
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            {appointment.patient}
                          </p>
                          <p className="text-sm text-gray-600">
                            {appointment.type}
                          </p>
                        </div>
                        <div className="font-semibold text-blue-600">
                          {appointment.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="bg-white px-6 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              Recursos que fazem a{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                diferença
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Descubra como nossa plataforma pode transformar a gestão da sua
              clínica médica
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Calendar,
                title: "Agendamento Inteligente",
                description:
                  "Sistema automatizado que evita conflitos e otimiza sua agenda",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Clock,
                title: "Lembretes Automáticos",
                description:
                  "Reduza faltas com notificações por SMS e e-mail personalizadas",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Users,
                title: "Gestão de Pacientes",
                description:
                  "Histórico completo e prontuário digital integrado",
                color: "from-green-500 to-teal-500",
              },
              {
                icon: Shield,
                title: "Segurança Total",
                description:
                  "Dados protegidos com criptografia de nível hospitalar",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: Star,
                title: "Interface Intuitiva",
                description: "Design pensado para facilitar o dia a dia médico",
                color: "from-indigo-500 to-purple-500",
              },
              {
                icon: Phone,
                title: "Suporte 24/7",
                description: "Equipe especializada sempre pronta para ajudar",
                color: "from-pink-500 to-rose-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group transform rounded-2xl bg-gray-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-lg"
              >
                <div
                  className={`h-14 w-14 bg-gradient-to-r ${feature.color} mb-6 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="beneficios"
        className="bg-gradient-to-br from-blue-50 to-purple-50 px-6 py-20"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">
                Transforme sua clínica em uma
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  máquina eficiente
                </span>
              </h2>

              <div className="space-y-6">
                {[
                  { stat: "80%", label: "Redução no tempo de agendamento" },
                  { stat: "65%", label: "Menos faltas nas consultas" },
                  { stat: "90%", label: "Satisfação dos pacientes" },
                  {
                    stat: "50%",
                    label: "Economia em recursos administrativos",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                      {benefit.stat}
                    </div>
                    <div className="text-lg text-gray-700">{benefit.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                "Agenda sempre organizada",
                "Pacientes mais satisfeitos",
                "Menos trabalho manual",
                "Mais tempo para cuidar",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="transform rounded-2xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CheckCircle className="mb-4 h-8 w-8 text-green-500" />
                  <p className="font-semibold text-gray-800">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="bg-white px-6 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              O que nossos{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                médicos
              </span>{" "}
              dizem
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Dr. Carlos Mendes",
                specialty: "Cardiologista",
                text: "O Dr Agenda revolucionou minha prática. Agora posso focar 100% nos meus pacientes.",
                rating: 5,
              },
              {
                name: "Dra. Ana Beatriz",
                specialty: "Dermatologista",
                text: "Interface incrível e suporte excepcional. Recomendo para todos os colegas!",
                rating: 5,
              },
              {
                name: "Dr. Roberto Silva",
                specialty: "Clínico Geral",
                text: "Economizo 3 horas por dia em tarefas administrativas. Simplesmente fantástico!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl bg-gray-50 p-8 transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-current text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mb-6 text-gray-700 italic">{testimonial.text}</p>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-600">{testimonial.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Pronto para transformar sua clínica?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-blue-100">
            Junte-se a mais de 1.000 médicos que já revolucionaram seus
            agendamentos
          </p>

          <div className="mx-auto max-w-md">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="flex-1 rounded-full px-6 py-4 text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/30 focus:outline-none"
              />
              <button
                onClick={handleSubmit}
                className="transform rounded-full bg-white px-8 py-4 font-semibold text-purple-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {isSubmitted ? "Obrigado!" : "Começar Agora"}
              </button>
            </div>
          </div>

          <p className="mt-6 text-sm text-blue-100">
            Teste grátis por 30 dias • Sem cartão de crédito • Cancele a
            qualquer momento
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-white/90 px-6 py-16 text-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="space-y-4">
              <Link href="/">
                <Image
                  src="/s-logo.svg"
                  alt="Logo"
                  width={156}
                  height={38}
                  priority
                />
              </Link>
              <p className="text-gray-400">
                Revolucionando a gestão médica com tecnologia de ponta.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Produto</h4>
              <div className="space-y-2 text-gray-400">
                <a
                  href="#"
                  className="block transition-colors hover:text-white"
                >
                  Recursos
                </a>
                <a
                  href="#"
                  className="block transition-colors hover:text-white"
                >
                  Preços
                </a>
                <a
                  href="#"
                  className="block transition-colors hover:text-white"
                >
                  Segurança
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Suporte</h4>
              <div className="space-y-2 text-gray-400">
                <a
                  href="#"
                  className="block transition-colors hover:text-white"
                >
                  Central de Ajuda
                </a>
                <a
                  href="#"
                  className="block transition-colors hover:text-white"
                >
                  Tutoriais
                </a>
                <a
                  href="#"
                  className="block transition-colors hover:text-white"
                >
                  Contato
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Contato</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(11) 9999-9999</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>contato@dragenda.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>São Paulo, SP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Dr Agenda. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
