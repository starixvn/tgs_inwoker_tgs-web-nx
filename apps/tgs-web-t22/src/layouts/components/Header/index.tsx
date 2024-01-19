import {memo} from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import DesktopHeader from "@/layouts/components/Header/components/DesktopHeader";

const Header = () => {
  const { isDesktopSize } = useRwd();

  return isDesktopSize && <DesktopHeader /> ;
};

export default memo(Header);
