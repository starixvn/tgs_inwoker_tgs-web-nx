import React, { createContext, useCallback, useState } from "react";

const initialState: {
  pageName: string;
  updatePageName: (newPageName: string) => void;
} = {
  pageName: "",
  updatePageName: () => {},
};

export const PageNameContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const PageNameContextProvider = ({ children }: ProviderProps) => {
  const [pageName, setPageName] = useState("");
  const updatePageName = useCallback((pageName: string) => {
    setPageName(pageName);
  }, []);

  return (
    <PageNameContext.Provider
      value={{
        pageName,
        updatePageName,
      }}
    >
      {children}
    </PageNameContext.Provider>
  );
};
