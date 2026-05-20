"use client";

import { useLoader } from "@/providers/LoaderProvider";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteLoader() {
  const pathname = usePathname();
  const { setLoading } = useLoader();

  useEffect(() => {
    let mounted = true;

    setLoading(true);

    const timer = setTimeout(() => {
      if (mounted) {
        setLoading(false);
      }
    }, 500);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [pathname, setLoading]);

  return null;
}