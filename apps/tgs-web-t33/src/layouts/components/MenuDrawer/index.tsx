import { Drawer } from "@mui/material";
import { useMemo } from "react";
import { useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import MenuDrawerList from "@/layouts/components/MenuDrawer/components/MenuDrawerList/MenuDrawerList";
import { MOBILE_DRAWER_WIDTH } from "@/theme/constants";
import { theme } from "@/theme";

const MenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isLargeDesktopSize, isXlSize } = useRwd();

  const drawerWidth = useMemo(() => {
    return MOBILE_DRAWER_WIDTH;
  }, [isXlSize, isLargeDesktopSize, isMenuOpen]);

  return (
    <Drawer
      variant={isLargeDesktopSize ? "persistent" : "temporary"}
      anchor={"left"}
      open={isLargeDesktopSize ? false : isMenuOpen}
      onClose={() => handleToggleMenu(false)}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          transition: "all ease-in-out 0.2s",
          border: "none",
          background: theme.gray30,
        },
      }}
    >
      {isLargeDesktopSize ? null : <MenuDrawerList />}
    </Drawer>
  );
};

export default MenuDrawer;
