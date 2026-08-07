"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AdminSearchContextValue = {
  query: string;
  setQuery: (value: string) => void;
  clear: () => void;
};

const AdminSearchContext = createContext<AdminSearchContextValue | null>(null);

export function AdminSearchProvider({ children }: { children: ReactNode }) {
  const [query, setQueryState] = useState("");
  const setQuery = useCallback((value: string) => setQueryState(value), []);
  const clear = useCallback(() => setQueryState(""), []);
  const value = useMemo(
    () => ({ query, setQuery, clear }),
    [query, setQuery, clear]
  );
  return (
    <AdminSearchContext.Provider value={value}>
      {children}
    </AdminSearchContext.Provider>
  );
}

export function useAdminSearch() {
  const ctx = useContext(AdminSearchContext);
  if (!ctx) {
    return {
      query: "",
      setQuery: () => undefined,
      clear: () => undefined,
    };
  }
  return ctx;
}
