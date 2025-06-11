import MiniLoading from "@/components/utils/MiniLoading";

export default function Loading() {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-black z-50">
            <MiniLoading />
        </div>
    );
}