import React from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import MobileHeader from "@/layouts/components/Header/components/MobileHeader";
import DesktopHeader from "@/layouts/components/Header/components/DesktopHeader";

const Header = () => {
  const { isDesktopSize } = useRwd();

  return isDesktopSize ? <DesktopHeader /> : <MobileHeader />;
};

export default React.memo(Header);
