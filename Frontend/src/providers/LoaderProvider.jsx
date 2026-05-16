"use client";

import BookingWebsiteLoader from "@/components/common/BookingWebsiteLoader";
import { createContext, useContext, useEffect, useState } from "react";

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export default function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  // 🔥 IMPORTANT ADD THIS
  useEffect(() => {
    window.__loader = { setLoading };
  }, [setLoading]);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading && <BookingWebsiteLoader />}
      {children}
    </LoaderContext.Provider>
  );
}