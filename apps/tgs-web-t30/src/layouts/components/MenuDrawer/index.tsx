import { Drawer } from "@mui/material";
import { useMemo } from "react";
import { useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import MenuDrawerList from "@/layouts/components/MenuDrawer/components/MenuDrawerList/MenuDrawerList";
import { MOBILE_DRAWER_WIDTH } from "@/theme/constants";

const MenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isXlSize, isExtraLargeDesktopSize } = useRwd();

  const drawerWidth = useMemo(() => {
    return MOBILE_DRAWER_WIDTH;
  }, [isMenuOpen]);

  return (
    <Drawer
      variant={isExtraLargeDesktopSize ? "persistent" : "temporary"}
      anchor={"right"}
      open={isExtraLargeDesktopSize ? false : isMenuOpen}
      onClose={() => handleToggleMenu(false)}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          transition: "all ease-in-out 0.2s",
          border: "none",
          background: "#0F324FE5",
          overflow: "visible",
        },
      }}
    >
      {isExtraLargeDesktopSize ? null : <MenuDrawerList />}
    </Drawer>
  );
};

export default MenuDrawer;
