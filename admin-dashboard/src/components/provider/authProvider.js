// "use client";

// import { useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { getMe } from "@/services/auth.service";
// import { useAuthStore } from "@/store/auth.store";

// const publicRoutes = ["/"];

// export function AuthProvider({ children }) {
//   const pathname = usePathname();

//   const setUser = useAuthStore((s) => s.setUser);
//   const clearUser = useAuthStore((s) => s.clearUser);

//   useEffect(() => {
//     // login page pe skip
//     if (publicRoutes.includes(pathname)) return;

//     const fetchUser = async () => {
//       try {
//         const res = await getMe();
//         console.log("GET ME:", res);

//         if (res?.success && res?.data?.user) {
//           setUser(res.data.user);
//         } else {
//           clearUser();
//         }
//       } catch (err) {
//         console.log("ERROR:", err?.response);
//         clearUser();
//       }
//     };

//     fetchUser();
//   }, [pathname]);

//   return children;
// }

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getMe } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function AuthProvider({ children }) {
  const pathname = usePathname();

  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ अगर login page है और cookie नहीं है → skip
        if (pathname === "/" && !document.cookie.includes("accessToken")) {
          clearUser();
          return;
        }

        const res = await getMe();
        console.log("GET ME:", res);

        if (res?.success && res?.data?.user) {
          setUser(res.data.user);
        } else {
          clearUser();
        }
      } catch (err) {
        console.log("ERROR:", err?.response);
        clearUser();
      }
    };

    fetchUser();
  }, [pathname]);

  return children;
}