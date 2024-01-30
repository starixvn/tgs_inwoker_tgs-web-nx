import React from "react";
import { Route } from "@tgs-web-nx/core/features";

type Props = {
  route: Route;
  children: React.ReactNode;
};
const LayoutProvider = ({ route, children }: Props) => {
  const LayoutComponent = route.layout;

  if (!LayoutComponent) return <>{children}</>;

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default LayoutProvider;
