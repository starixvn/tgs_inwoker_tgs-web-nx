import React from "react";
import { useHeader } from "@tgs-web-nx/core/features";
import menuIcon from "@/assets/t36/images/header/icon-menu.svg";
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
      width={width ?? "32px"}
      height={height ?? "32px"}
      onClick={() => handleToggleMenu()}
      style={{
        cursor: "pointer",
        marginRight: "10px",
      }}
    />
  );
};

export default MenuButton;
