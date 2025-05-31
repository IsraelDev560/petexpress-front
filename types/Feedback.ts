type FeedbackType = 'success' | 'error' | '';

export interface Feedback {
  message: string;
  type: FeedbackType;
}