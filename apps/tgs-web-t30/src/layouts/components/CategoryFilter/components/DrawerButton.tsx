import React, { useState } from "react";
import styled from "styled-components";
import CategoryDrawer from "@/layouts/components/CategoryFilter/components/CategoryDrawer";
import ProviderDrawer from "@/layouts/components/CategoryFilter/components/ProviderDrawer";
import FilterItemButton from "@/layouts/components/CategoryFilter/components/FilterItemHeader";

export const DrawerButtonGroup = styled.div`
  width: calc((100% - 15px) / 2);
`;

type Props = {
  drawerType: "provider" | "category";
};

const DrawerButton = ({ drawerType }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DrawerButtonGroup>
      <FilterItemButton drawerType={drawerType} onClick={() => setIsOpen(true)} />

      {drawerType === "provider" ? (
        <ProviderDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} drawerType={"provider"} />
      ) : (
        <CategoryDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} drawerType={"category"} />
      )}
    </DrawerButtonGroup>
  );
};

export default DrawerButton;
