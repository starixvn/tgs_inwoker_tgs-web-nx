import React, { HTMLProps } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import MobileHeader from "@/layouts/components/Header/components/MobileHeader";
import DesktopHeader from "@/layouts/components/Header/components/DesktopHeader";

const Header = (
  props: HTMLProps<HTMLDivElement> & {
    hideBrandLogo?: boolean;
  },
) => {
  const { isDesktopSize } = useRwd();

  // @ts-ignore
  return isDesktopSize ? <DesktopHeader {...props} /> : <MobileHeader />;
};

export default React.memo(Header);
