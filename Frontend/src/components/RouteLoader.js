"use client";

import { useLoader } from "@/providers/LoaderProvider";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteLoader() {
  const pathname = usePathname();
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}