'use client'

import { AuthForm } from "@/components/AuthForm";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      fetch("/api/wakeup", {
        method: 'POST'
      })
        .then(() => console.log("Render service activated"))
        .catch(() => console.warn("Failed to activate the API"));
    }
  }, []);
  return (
    <div className="flex flex-col items-center mx-auto justify-center min-h-screen p-2 bg-[#FFFFFF] dark:bg-[#09090B]">
      <AuthForm />
    </div>
  );
}
