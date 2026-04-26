import { getToken } from "next-auth/jwt";

export const fetchWithAuth = async (url, options = {}) => {
  const token = await getToken({
    req: { headers: {} }, // Next.js handles internally
    secret: process.env.NEXTAUTH_SECRET,
  });

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token?.sub}`, // 🔥 real token
    },
  });
};