import { Drawer } from "@mui/material";
import { useMemo } from "react";
import { useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import MenuDrawerList from "@/layouts/components/MenuDrawer/components/MenuDrawerList/MenuDrawerList";
import { MOBILE_DRAWER_WIDTH } from "@/theme/constants";
import bg from "@/assets/t21/images/drawer/bg.png";

const MenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isLargeDesktopSize } = useRwd();

  const drawerWidth = useMemo(() => {
    return MOBILE_DRAWER_WIDTH;
  }, []);

  return (
    <Drawer
      variant={"temporary"}
      anchor={"left"}
      open={isMenuOpen}
      onClose={() => handleToggleMenu(false)}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          transition: "all ease-in-out 0.2s",
          border: "none",
          background: `url(${bg})`,
          backgroundPosition: "bottom",
        },
      }}
    >
      {isLargeDesktopSize ? null : <MenuDrawerList />}
    </Drawer>
  );
};

export default MenuDrawer;
