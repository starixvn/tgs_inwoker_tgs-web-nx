import React from "react";
import { useHeader } from "@tgs-web-nx/core/features";
import menuIcon from "@/assets/t31/images/header/contextMenu/Home.png";
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
