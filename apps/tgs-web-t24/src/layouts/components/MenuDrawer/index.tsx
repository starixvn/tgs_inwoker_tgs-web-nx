import { Drawer } from "@mui/material";
import { useMemo } from "react";

import { useHeader } from "@/core/feature/useHeader";
import { useRwd } from "@/core/hooks/tools/useRwd";
import MenuDrawerList from "@/layouts/components/MenuDrawer/components/MenuDrawerList";
import {
  DESKTOP_DRAWER_WIDTH,
  DRAWER_SHRINK_WIDTH,
  HEADER_HEIGHT,
  MOBILE_DRAWER_WIDTH,
  TABLET_DRAWER_WIDTH,
} from "@/theme/constants";
import MenuDrawerHeader from "@/layouts/components/MenuDrawer/components/MenuDrawerHeader";

const MenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isLargeDesktopSize, isXlSize } = useRwd();

  const drawerWidth = useMemo(() => {
    if (isXlSize) {
      return isMenuOpen ? DESKTOP_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH;
    }

    if (isLargeDesktopSize) {
      return isMenuOpen ? TABLET_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH;
    }

    return MOBILE_DRAWER_WIDTH;
  }, [isXlSize, isLargeDesktopSize, isMenuOpen]);

  return (
    <Drawer
      variant={isLargeDesktopSize ? "persistent" : "temporary"}
      anchor={"left"}
      open={isLargeDesktopSize ? true : isMenuOpen}
      onClose={() => handleToggleMenu(false)}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          marginTop: {
            xs: 0,
            md: HEADER_HEIGHT,
          },
          height: {
            sx: "100vh",
            md: `calc(100vh - ${HEADER_HEIGHT})`,
          },
          width: drawerWidth,
          transition: "all ease-in-out 0.2s",
          border: "none",
        },
      }}
    >
      {!isLargeDesktopSize && <MenuDrawerHeader />}
      <MenuDrawerList />
    </Drawer>
  );
};

export default MenuDrawer;
