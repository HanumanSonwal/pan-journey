"use client";

import useApplyTheme from "@/hooks/useApplyTheme";
import GlobalLoginModal from "@/modules/auth/components/GlobalLoginModal";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  useApplyTheme();

  return (
    <SessionProvider>
      {children}
      <GlobalLoginModal />
    </SessionProvider>
  );
}
