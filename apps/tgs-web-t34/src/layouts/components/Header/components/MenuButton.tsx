import React from "react";
import { useHeader } from "@tgs-web-nx/core/features";
import menuIcon from "@/assets/t34/images/header/icon-menu.png";
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
      width={width ?? "21px"}
      height={height ?? "21px"}
      onClick={() => handleToggleMenu()}
      style={{
        cursor: "pointer",
      }}
    />
  );
};

export default MenuButton;
