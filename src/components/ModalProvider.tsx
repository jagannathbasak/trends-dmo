"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ModalContextValue = {
  isOpen: boolean;
  intent: string;
  open: (intent?: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [intent, setIntent] = useState("Request access");

  const open = useCallback((nextIntent?: string) => {
    if (nextIntent) setIntent(nextIntent);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, intent, open, close }),
    [isOpen, intent, open, close],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
}
