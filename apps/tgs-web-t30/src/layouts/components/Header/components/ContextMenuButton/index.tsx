import React, { useState } from "react";
import styled from "styled-components";
import { Drawer } from "@mui/material";
import { useRwd } from "@tgs-web-nx/core/hooks";
import avatarImg from "@/assets/t30/images/header/icon-avatar.svg";
import avatarWhiteImg from "@/assets/t30/images/header/icon-avatar-white.svg";
import arrowUpImg from "@/assets/t30/images/header/icon-arrow-up.svg";
import arrowDownImg from "@/assets/t30/images/header/icon-arrow-down-white.svg";
import MemberMenu from "@/layouts/components/Header/components/ContextMenuButton/components/MemberMenu";
import Modal from "@/components/UI/Modal";
import ContextMenu from "@/layouts/components/Header/components/ContextMenuButton/components/ContextMenu";
import Icon from "@/components/project/Icon";
const ContextMenuButtonContainer = styled.div`
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  width: 20px;
  height: 20px;
  background: url(${avatarImg}) no-repeat center center;
  background-size: cover;
`;

type DesktopAvatarProps = {
  $isOpen: boolean;
};
const DesktopAvatar = styled.div<DesktopAvatarProps>`
  background: ${({ $isOpen, theme }) => ($isOpen ? theme.dae3 : "#276AA5")};
  border-radius: 3px;
  padding: 6px 5px;
  display: flex;
  align-items: center;
  gap: 10px;
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
        {isDesktopSize ? (
          <DesktopAvatar $isOpen={isOpen}>
            <Icon iconUrl={isOpen ? avatarImg : avatarWhiteImg} width={"20px"} height={"20px"} />
            <Icon iconUrl={isOpen ? arrowUpImg : arrowDownImg} width={"10px"} height={"10px"} />
          </DesktopAvatar>
        ) : (
          <AvatarContainer />
        )}
      </ContextMenuButtonContainer>

      {isDesktopSize ? (
        <Modal open={isOpen} onClose={() => handleClick(false)}>
          <ContextMenu />
        </Modal>
      ) : (
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
      )}
    </>
  );
};

export default ContextMenuButton;
