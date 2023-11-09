import { Drawer } from "@mui/material";
import DesktopMenuDrawer from "@/layouts/components/MenuDrawer/components/DesktopMenuDrawer";
import MobileMenuDrawer from "@/layouts/components/MenuDrawer/components/MobileMenuDrawer";
import { useHeader } from "@/core/feature/useHeader";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { DRAWER_SHRINK_WIDTH, DRAWER_WIDTH } from "@/theme/constants";

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
