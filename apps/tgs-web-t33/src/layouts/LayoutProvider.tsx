import React from "react";
import { Route } from "@tgs-web-nx/core/features";
import DefaultLayout from "@/layouts/DefaultLayout";

type Props = {
  route: Route;
  children: React.ReactElement;
};
const LayoutProvider = ({ children, route }: Props) => {
  const LayoutComponent = route?.layout;

  if (!LayoutComponent) return <DefaultLayout>{children}</DefaultLayout>;

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default React.memo(LayoutProvider);
