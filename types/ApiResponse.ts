export type ApiResponse<T> = {
  status: number;
  success: boolean;
  data: T | {
    message: string;
    status: number;
    timeStamp?: string;
  };
};