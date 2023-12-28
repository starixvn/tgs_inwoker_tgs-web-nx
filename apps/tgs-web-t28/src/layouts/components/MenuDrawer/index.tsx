import { Drawer } from "@mui/material";
import { useMemo } from "react";
import { useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import DesktopMenuDrawer from "./components/DesktopMenuDrawer";
import MenuDrawerList from "@/layouts/components/MenuDrawer/components/MenuDrawerList/MenuDrawerList";
import {
  DESKTOP_DRAWER_WIDTH,
  DRAWER_SHRINK_WIDTH,
  MOBILE_DRAWER_WIDTH,
  TABLET_DRAWER_WIDTH,
  DESKTOP_HEADER_HEIGHT,
} from "@/theme/constants";
import { theme } from "@/theme";

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
      container={document.getElementById("test")}
      variant={isLargeDesktopSize ? "persistent" : "temporary"}
      anchor={"left"}
      open={isMenuOpen}
      onClose={() => handleToggleMenu(false)}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          marginTop: {
            xs: 0,
            md: DESKTOP_HEADER_HEIGHT,
          },
          height: {
            sx: "100vh",
            md: `calc(100vh - ${DESKTOP_HEADER_HEIGHT})`,
          },
          width: drawerWidth,
          transition: "all ease-in-out 0.2s",
          border: "none",
        },
      }}
    >
      <DesktopMenuDrawer />
    </Drawer>
  );
};

export default MenuDrawer;
