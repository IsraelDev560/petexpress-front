type ApiSuccess<T> = { status: number; data: T };
type ApiError = { success: false; message: string; timeStamp?: string };
export type ApiResponse<T> = ApiSuccess<T> | ApiError;