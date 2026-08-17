// "use client";

// import GlobalLoginModal from "@/modules/auth/components/GlobalLoginModal";
// import { SessionProvider } from "next-auth/react";

// export default function Providers({ children }) {
//   return (
//     <SessionProvider>
//       {children}
//       <GlobalLoginModal />
//     </SessionProvider>
//   );
// }

"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import { queryClient } from "@/lib/queryClient";

export default function AppProviders({ children }) {
  return (
    <AntdRegistry>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </AntdRegistry>
  );
}
