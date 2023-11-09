import { Drawer } from "@mui/material";
import { useHeader } from "@/core/feature/useHeader";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { DRAWER_SHRINK_WIDTH, DRAWER_WIDTH } from "@/theme/constants";
import MenuDrawerList from "@/layouts/components/MenuDrawer/components/MenuDrawerList";

const MenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isDesktopSize } = useRwd();

  return (
    <Drawer
      variant={isDesktopSize ? "persistent" : "temporary"}
      anchor={"left"}
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
      <MenuDrawerList />
    </Drawer>
  );
};

export default MenuDrawer;
