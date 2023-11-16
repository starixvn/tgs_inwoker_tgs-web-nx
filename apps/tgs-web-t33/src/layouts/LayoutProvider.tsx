import React from "react";
import { useRoute } from "@tgs-web-nx/core/features";
import DefaultLayout from "@/layouts/DefaultLayout";

type Props = {
  children: React.ReactElement;
};
const LayoutProvider = ({ children }: Props) => {
  const { route } = useRoute();
  const LayoutComponent = route?.layout;

  if (!LayoutComponent) return <DefaultLayout>{children}</DefaultLayout>;

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default React.memo(LayoutProvider);
