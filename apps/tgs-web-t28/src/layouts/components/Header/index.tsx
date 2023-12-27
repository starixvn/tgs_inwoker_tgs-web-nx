import React from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import HeaderContent from "@/layouts/components/Header/components/DesktopHeader";

const Header = () => {
  const { isDesktopSize } = useRwd();

  return <HeaderContent />;
};

export default React.memo(Header);
