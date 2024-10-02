import WhiteMemberMenu from "@/layouts/components/Header/components/ContextMenuButton/components/WhiteMemberMenu";
import { Drawer } from "@mui/material";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React, { useState } from "react";
import styled from "styled-components";

const ContextMenuButtonContainer = styled.div`
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  width: 33px;
  height: 33px;
  background: url("") no-repeat center center;
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
        <WhiteMemberMenu handleCloseContextMenu={() => handleClick(false)} />
      </Drawer>
    </>
  );
};

export default ContextMenuButton;
