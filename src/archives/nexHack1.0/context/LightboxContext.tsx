import { createContext, useContext, useState } from "react";

type LightboxContextType = {
  isLightboxOpen: boolean;
  setIsLightboxOpen: (v: boolean) => void;
};

const LightboxContext = createContext<LightboxContextType | null>(null);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <LightboxContext.Provider value={{ isLightboxOpen, setIsLightboxOpen }}>
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used inside LightboxProvider");
  return ctx;
}
