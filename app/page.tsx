'use client'

import { AuthForm } from "@/components/AuthForm";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/wakeup")
      .then(() => console.log("🔔 Render acordado"))
      .catch(() => console.warn("😴 Falha ao acordar API"));
  }, []);
  return (
    <div className="flex flex-col items-center mx-auto justify-center min-h-screen p-2 bg-[#FFFFFF] dark:bg-[#09090B]">
      <AuthForm />
    </div>
  );
}
