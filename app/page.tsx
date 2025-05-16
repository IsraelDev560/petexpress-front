import { AuthForm } from "@/components/AuthForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center mx-auto justify-center min-h-screen p-2 bg-[#FFFFFF] dark:bg-[#09090B]">
        <AuthForm />
    </div>
  );
}
