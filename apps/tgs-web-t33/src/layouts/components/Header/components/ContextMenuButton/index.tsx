import React, { useState } from "react";
import styled from "styled-components";
import { Drawer } from "@mui/material";
import { useRwd } from "@tgs-web-nx/core/hooks";
import avatarImg from "@/assets/t33/images/account/avatar.svg";
import { theme } from "@/theme";
import DarkMemberMenu from "@/layouts/components/Header/components/ContextMenuButton/components/DarkMemberMenu";
import WhiteMemberMenu from "@/layouts/components/Header/components/ContextMenuButton/components/WhiteMemberMenu";

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
  const { isDesktopSize } = useRwd();

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
          },
        }}
      >
        {isDesktopSize ? (
          <WhiteMemberMenu handleCloseContextMenu={() => handleClick(false)} />
        ) : (
          <DarkMemberMenu handleCloseContextMenu={() => handleClick(false)} />
        )}
      </Drawer>
    </>
  );
};

export default ContextMenuButton;
