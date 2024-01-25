import { Drawer } from "@mui/material";
import { useMemo } from "react";
import { useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import DesktopMenuDrawer from "@/layouts/components/MenuDrawer/components/DesktopMenuDrawer";
import MobileMenuDrawer from "@/layouts/components/MenuDrawer/components/MobileMenuDrawer";
import {
  DESKTOP_DRAWER_WIDTH,
  DRAWER_SHRINK_WIDTH,
  MOBILE_DRAWER_WIDTH,
  TABLET_DRAWER_WIDTH,
} from "@/theme/constants";

const MenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isLargeDesktopSize, isXlSize } = useRwd();

  const drawerWidth = useMemo(() => {
    if (isXlSize) {
      return isMenuOpen ? DESKTOP_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH;
    }

    if (isLargeDesktopSize) {
      return isMenuOpen ? DESKTOP_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH;
    }

    return MOBILE_DRAWER_WIDTH;
  }, [isXlSize, isLargeDesktopSize, isMenuOpen]);

  return (
    <Drawer
      variant={isLargeDesktopSize ? "persistent" : "temporary"}
      anchor={isLargeDesktopSize ? "left" : "right"}
      open={isLargeDesktopSize ? true : isMenuOpen}
      onClose={() => handleToggleMenu(false)}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          transition: "all ease-in-out 0.2s",
          border: "none",
        },
      }}
    >
      {isLargeDesktopSize ? <DesktopMenuDrawer /> : <MobileMenuDrawer />}
    </Drawer>
  );
};

export default MenuDrawer;
