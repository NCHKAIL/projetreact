
import { createContext, useContext, useState } from "react";

const PanierContext = createContext();

export function PanierProvider({ children }) {
  const [panier, setPanier] = useState([]);

  return (
    <PanierContext.Provider value={{ panier, setPanier }}>
      {children}
    </PanierContext.Provider>
  );
}

export function usePanier() {
  return useContext(PanierContext);
}
