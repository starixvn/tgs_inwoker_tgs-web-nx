import { Drawer } from "@mui/material";
import { useMemo } from "react";
import { useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { theme } from "@/theme";
import MobileMenuDrawer from "@/layouts/components/MenuDrawer/components/MobileMenuDrawer";
import { MOBILE_DRAWER_WIDTH } from "@/theme/constants";

const MenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isLargeDesktopSize, isXlSize } = useRwd();

  const drawerWidth = useMemo(() => {
    return MOBILE_DRAWER_WIDTH;
  }, []);

  return (
    <Drawer
      variant={isLargeDesktopSize ? "persistent" : "temporary"}
      anchor={"right"}
      open={isLargeDesktopSize ? false : isMenuOpen}
      onClose={() => handleToggleMenu(false)}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          transition: "all ease-in-out 0.5s",
          border: "none",
          background: theme.secondary,
        },
      }}
    >
      {isLargeDesktopSize ? null : <MobileMenuDrawer />}
    </Drawer>
  );
};

export default MenuDrawer;
