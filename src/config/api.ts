// src/config/api.ts
// Central place for API configuration.
// Every service file imports BASE_URL from here —
// so changing the API URL means changing it in one place only.

// import.meta.env is Vite's way of reading environment variables.
// Falls back to localhost if the variable isn't set.
export const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// API version prefix — all our routes start with /api/v1
export const API_URL = `${BASE_URL}/api`;
