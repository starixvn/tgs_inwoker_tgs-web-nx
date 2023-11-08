import DesktopMenuDrawer from "@/layouts/components/Header/components/MenuDrawer/components/DesktopMenuDrawer";
import MobileMenuDrawer from "@/layouts/components/Header/components/MenuDrawer/components/MobileMenuDrawer";
import { useHeader } from "@/core/feature/useHeader";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { DRAWER_SHRINK_WIDTH, DESKTOP_DRAWER_WIDTH, MOBILE_DRAWER_WIDTH } from "@/theme/constants";
import { Drawer } from "@mui/material";
import { useMemo } from "react";

const MenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isDesktopSize } = useRwd();

  const drawerWidth = useMemo(() => {
    if (isDesktopSize) {
      return isMenuOpen ? DESKTOP_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH;
    }

    return MOBILE_DRAWER_WIDTH;
  }, [isDesktopSize, isMenuOpen]);

  return (
    <Drawer
      variant={isDesktopSize ? "persistent" : "temporary"}
      anchor={isDesktopSize ? "left" : "right"}
      open={isDesktopSize ? true : isMenuOpen}
      onClose={() => handleToggleMenu(false)}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          transition: "width ease-in-out 0.2s",
          border: "none",
        },
      }}
    >
      {isDesktopSize ? <DesktopMenuDrawer /> : <MobileMenuDrawer />}
    </Drawer>
  );
};

export default MenuDrawer;
