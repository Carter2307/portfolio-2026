import axios from "axios";

/**
 * Shared HTTP client. Page content is served from the i18n dictionaries at
 * render time, so this is the entry point for any future client-side data.
 */
export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});
