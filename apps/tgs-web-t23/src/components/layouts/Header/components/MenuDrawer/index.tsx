import React from "react";
import { useRwd } from "@/core/hooks/tools/useRwd";
import MobileMenuDrawer from "@/components/layouts/Header/components/MenuDrawer/components/MobileMenuDrawer";
import { DRAWER_SHRINK_WIDTH, DRAWER_WIDTH } from "@/core/feature/useHeader/contexts/headerContext";
import { Drawer } from "@mui/material";
import { useHeader } from "@/core/feature/useHeader";
import DesktopMenuDrawer from "@/components/layouts/Header/components/MenuDrawer/components/DesktopMenuDrawer";

const MenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isDesktopSize } = useRwd();

  return (
    <Drawer
      variant={isDesktopSize ? "persistent" : "temporary"}
      anchor={isDesktopSize ? "left" : "right"}
      open={isDesktopSize ? true : isMenuOpen}
      onClose={() => handleToggleMenu(false)}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMenuOpen ? DRAWER_WIDTH : DRAWER_SHRINK_WIDTH,
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
