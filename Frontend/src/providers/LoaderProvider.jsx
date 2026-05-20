"use client";


import BookingWebsiteLoader from "@/components/common/BookingWebsiteLoader";
import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const LoaderContext = createContext();

export default function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const value = useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading]
  );

  return (
    <LoaderContext.Provider value={value}>
      {loading && <BookingWebsiteLoader />}
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);