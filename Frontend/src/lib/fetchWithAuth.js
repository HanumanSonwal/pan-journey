// import { getSession } from "next-auth/react";

// export const fetchWithAuth = async (url, options = {}) => {
//   const session = await getSession();

//   return fetch(url, {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${session?.accessToken}`, // ✅ सही
//     },
//   });
// };
