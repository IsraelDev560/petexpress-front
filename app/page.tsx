import { AuthForm } from "@/components/AuthForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token");
  if (token) redirect('/dashboard')
  return (
    <div className="flex flex-col items-center mx-auto justify-center min-h-screen p-2 bg-[#FFFFFF] dark:bg-[#09090B]">
      <AuthForm />
    </div>
  );
}
