"use client";

import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  const [globalValue, setGlobalValue] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [gwatchlist, setWatchlistg] = useState("");
  const [gemail, setEmailg] = useState("");
  const [gprofilepicture, setProfilepicture] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setGlobalValue(data);
        setAllProducts(data);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        globalValue,
        setGlobalValue,
        allProducts,
        gwatchlist,
        setWatchlistg,
        gemail,
        setEmailg,
        gprofilepicture,
        setProfilepicture
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
