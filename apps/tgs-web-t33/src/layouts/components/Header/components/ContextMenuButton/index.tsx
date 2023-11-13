import React, { useState } from "react";
import styled from "styled-components";
import { Drawer } from "@mui/material";
import ContextMenu from "@/layouts/components/Header/components/ContextMenuButton/components/ContextMenu";
import avatarImg from "@/assets/t33/images/account/avatar.svg";
import Modal from "@/components/UI/Modal";
import { theme } from "@/theme";
import MobileMenuDrawer from "@/layouts/components/MenuDrawer/components/MobileMenuDrawer/MobileMenuDrawer";
import { useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import MemberMenu from "@/layouts/components/Header/components/ContextMenuButton/components/MemberMenu";

const ContextMenuButtonContainer = styled.div`
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  width: 33px;
  height: 33px;
  background: url(${avatarImg}) no-repeat center center;
  background-size: cover;
`;

const ContextMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (isOpen?: boolean) => {
    if (typeof isOpen !== "undefined") {
      setIsOpen(isOpen);
      return;
    }

    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <ContextMenuButtonContainer onClick={() => handleClick()}>
        <AvatarContainer />
      </ContextMenuButtonContainer>

      <Drawer
        variant={"temporary"}
        anchor={"right"}
        open={isOpen}
        onClose={() => handleClick(false)}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "222px",
            transition: "all ease-in-out 0.2s",
            border: "none",
            background: theme.gray60,
          },
        }}
      >
        <MemberMenu handleCloseContextMenu={() => handleClick(false)} />
      </Drawer>
    </>
  );
};

export default ContextMenuButton;
