"use client";

import { App } from "antd";
import { useEffect } from "react";
import { setMessageInstance } from "@/lib/antdMessage";

export default function MessageProvider({ children }) {
  const { message } = App.useApp();

  useEffect(() => {
    setMessageInstance(message); // ⭐ inject globally
  }, [message]);

  return children;
}