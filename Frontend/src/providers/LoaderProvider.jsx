"use client";

import { createContext, useContext, useMemo, useState } from "react";
import BookingWebsiteLoader from "@/components/common/loder/BookingWebsiteLoader";

const LoaderContext = createContext(null);

export default function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  const value = useMemo(
    () => ({
      loading,
      setLoading,
      showLoader,
      hideLoader,
    }),
    [loading],
  );

  return (
    <LoaderContext.Provider value={value}>
      {children}

      {loading && <BookingWebsiteLoader />}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader must be used inside LoaderProvider");
  }

  return context;
};
