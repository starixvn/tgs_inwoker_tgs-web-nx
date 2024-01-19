import { Drawer } from "@mui/material";
import { useMemo } from "react";
import { useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import MenuDrawerList from "./components/MenuDrawerList/MenuDrawerList";
import {
  DESKTOP_DRAWER_WIDTH,
  DRAWER_SHRINK_WIDTH,
  MOBILE_DRAWER_WIDTH,
  TABLET_DRAWER_WIDTH,
} from "@/theme/constants";
import { theme } from "@/theme";

const MenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isDesktopSize, isExtraLargeDesktopSize } = useRwd();

  const drawerWidth = useMemo(() => {
    if (isExtraLargeDesktopSize) {
      return isMenuOpen ? DESKTOP_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH;
    }

    if (isDesktopSize) {
      return isMenuOpen ? TABLET_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH;
    }

    return DRAWER_SHRINK_WIDTH;
  }, [isExtraLargeDesktopSize, isDesktopSize, isMenuOpen]);

  return (
    <Drawer
      variant={"persistent"}
      anchor={"left"}
      open={true}
      onClose={() => handleToggleMenu(false)}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          transition: "all ease-in-out 0.2s",
          border: "none",
          background: theme.black03,
          boxShadow: " 12px 0px 24px 0px #000000",
        },
      }}
    >
      <MenuDrawerList />
    </Drawer>
  );
};

export default MenuDrawer;
