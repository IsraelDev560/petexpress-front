import MiniLoading from "@/components/utils/MiniLoading";

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center mx-auto w-full justify-center text-center p-4">
            <p className="text-lg mb-4">
                We are starting the engines... <br />
                Hold on there, the server is waking up 😴⚡
            </p>
            <MiniLoading />
        </div>
    )
}