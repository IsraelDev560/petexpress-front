const isProd = process.env.NODE_ENV === "production";

export const API_URL = isProd
  ? process.env.API_URL
  : process.env.API_URL_DEV;

export const NEXT_PUBLIC_API_FRONT = isProd
  ? process.env.NEXT_PUBLIC_API_FRONT
  : process.env.NEXT_PUBLIC_API_FRONT_DEV;