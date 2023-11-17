import React, { useState } from "react";
import styled from "styled-components";
import { Drawer } from "@mui/material";
import avatarImg from "@/assets/t30/images/header/icon-avatar.svg";
import MemberMenu from "@/layouts/components/Header/components/ContextMenuButton/components/MemberMenu";

const ContextMenuButtonContainer = styled.div`
  cursor: pointer;
  padding: 0px 11px;
`;

const AvatarContainer = styled.div`
  width: 20px;
  height: 20px;
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
        anchor={"left"}
        open={isOpen}
        onClose={() => handleClick(false)}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "300px",
            transition: "all ease-in-out 0.2s",
            border: "none",
            overflow: "visible",
            background: "#0f324fe5",
          },
        }}
      >
        <MemberMenu handleCloseContextMenu={() => handleClick(false)} />
      </Drawer>
    </>
  );
};

export default ContextMenuButton;
