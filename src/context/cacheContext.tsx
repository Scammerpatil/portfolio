"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types/User";

interface CacheContextType {
  cache: User | null;
  setCache: (user: User | null) => void;
}

const CacheContext = createContext<CacheContextType | undefined>(undefined);

export const CacheProvider = ({ children }: { children: ReactNode }) => {
  const [cache, setCache] = useState<User | null>(null);

  return (
    <CacheContext.Provider value={{ cache, setCache }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = (): CacheContextType => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error("useCache must be used within a CacheProvider");
  }
  return context;
};
