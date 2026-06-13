"use client";

import GlobalLoginModal from "@/modules/auth/components/GlobalLoginModal";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
      <GlobalLoginModal />
    </SessionProvider>
  );
}
