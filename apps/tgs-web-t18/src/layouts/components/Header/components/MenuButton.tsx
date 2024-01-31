import React from "react";
import { useHeader } from "@tgs-web-nx/core/features";
import menuIcon from "@/assets/t18/images/header/icon_menu.png";
import Icon from "@/components/project/Icon";

type Props = {};
const MenuButton = ({}: Props) => {
  const { handleToggleMenu } = useHeader();

  return (
    <Icon
      iconUrl={menuIcon}
      width={"33px"}
      height={"33px"}
      onClick={() => handleToggleMenu()}
      style={{
        cursor: "pointer",
      }}
    />
  );
};

export default MenuButton;
