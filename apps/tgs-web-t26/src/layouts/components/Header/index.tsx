import React from "react";
import DesktopHeader from "@/layouts/components/Header/components/DesktopHeader";

const Header = () => {
  //t26 desktop 和mobile共用Header元件
  return <DesktopHeader />;
};

export default React.memo(Header);
