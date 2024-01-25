import React from "react";
import { useHeader } from "@tgs-web-nx/core/features";
import menuIcon from "@/assets/t27/images/header/icon-menu.svg";
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
      width={width ?? "24px"}
      height={height ?? "24px"}
      onClick={() => handleToggleMenu()}
      style={{
        cursor: "pointer",
        marginLeft: "10px"
      }}
    />
  );
};

export default MenuButton;
