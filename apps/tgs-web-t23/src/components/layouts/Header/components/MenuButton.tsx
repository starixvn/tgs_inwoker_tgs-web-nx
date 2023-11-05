import React from "react";
import menuIcon from "@/assets/t23/images/header/icon-menu.png";
import { useHeader } from "@/core/feature/useHeader";
import Icon from "@/components/project/Icon";

type Props = {
  width?: string;
  height?: string;
};
const MenuButton = ({ width, height }: Props) => {
  const { handleToggleMenu } = useHeader();

  return (
    <Icon
      iconUrl={menuIcon}
      width={width ?? "33px"}
      height={height ?? "33px"}
      onClick={() => handleToggleMenu()}
      style={{
        cursor: "pointer",
      }}
    />
  );
};

export default MenuButton;
