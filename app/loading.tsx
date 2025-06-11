import MiniLoading from "@/components/utils/MiniLoading";

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center mx-auto w-full justify-center text-center p-4">
            <p className="text-lg mb-4">
                Estamos ligando os motores... <br />
                Segura aí que o servidor tá acordando 😴⚡
            </p>
            <MiniLoading />
        </div>
    )
}