import { Feedback as FeedbackType } from "@/types/Feedback";

export default function FeedbackComponent({ message, type }: FeedbackType) {
    if (!message) return null;

    return (
        <p
            className={`text-sm mt-2 ${
                type === 'error' ? 'text-red-500' :
                type === 'success' ? 'text-green-500' :
                'text-gray-500'
            }`}
        >
            {message}
        </p>
    );
}
