import React, { createContext } from "react";

export interface Route {
  path: string;
  component: React.ReactNode;
  layout?: ({ children }: any) => JSX.Element;
  isAnonymousAllowed?: boolean;
}

const initialState: {
  route: Route | undefined;
} = {
  route: undefined,
};

export const RouteContext = createContext({
  ...initialState,
});

type ProviderProps = {
  route: Route | undefined;
  children: React.ReactNode;
};

export const RouteContextProvider = ({ route, children }: ProviderProps) => {
  return (
    <RouteContext.Provider
      value={{
        route,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export const RouteContextConsumer = RouteContext.Consumer;
