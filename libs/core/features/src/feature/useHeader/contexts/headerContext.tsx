import React, { createContext, useState } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";

const initialState: {
  isMenuOpen: boolean;
  handleToggleMenu: (newIsOpen?: boolean) => void;
} = {
  isMenuOpen: false,
  handleToggleMenu: () => {},
};

export const HeaderContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
  isInitOpen?: boolean;
};

export const HeaderContextProvider = ({ children, isInitOpen }: ProviderProps) => {
  const { isLargeDesktopSize } = useRwd();
  const initialIsMenuOpen = typeof isInitOpen === "boolean" ? isInitOpen : isLargeDesktopSize;
  const [isMenuOpen, setIsMenuOpen] = useState(initialIsMenuOpen);

  const handleToggleMenu = (newIsOpen?: boolean) => {
    if (typeof newIsOpen !== "undefined") {
      setIsMenuOpen(newIsOpen);
      return;
    }

    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <HeaderContext.Provider
      value={{
        isMenuOpen,
        handleToggleMenu,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
