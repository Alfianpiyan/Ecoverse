"use client";
import { createContext, useState, useContext } from "react";
import { acaraList as initialAcara } from "./dataAcara";

const AcaraContext = createContext();

export function AcaraProvider({ children }) {
  const [acaraList, setAcaraList] = useState(initialAcara);

  const addAcara = (newAcara) => {
    setAcaraList((prev) => [...prev, { ...newAcara, id: prev.length + 1 }]);
  };

  return (
    <AcaraContext.Provider value={{ acaraList, addAcara }}>
      {children}
    </AcaraContext.Provider>
  );
}

export const useAcara = () => {
  const context = useContext(AcaraContext);
  if (!context) {
    throw new Error("useAcara must be used within an AcaraProvider");
  }
  return context;
};
