import React, { useState } from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import avatarImg from "@/assets/t18/images/account/avatar.png";
import SvgIcon from "@/components/UI/SvgIcon";
import Modal from "@/components/UI/Modal";
import { media } from "@/theme/breakpoints";
import arrowImg from "@/assets/t18/images/header/contextMenu/icon_arrow.svg";
import ContextMenu from "@/layouts/components/Header/components/ContextMenu";
import Avatar from "@/components/project/Avatar";

const ContextMenuButtonContainer = styled.div`
  height: 40px;
  padding: 4px 4px 4px 15px;
  border-radius: 50px;
  background: #212937;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  width: 30px;
  height: 24px;
  background: url(${avatarImg}) no-repeat center center;
  background-size: cover;
`;

const UsernameContainer = styled.div`
  display: none;

  ${media.sm} {
    display: block;
    color: white;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.318rem;
    text-overflow: ellipsis;
    max-width: 60px;
  }
`;

const ArrowContainer = styled.div<{
  open: boolean;
}>`
  width: 32px;
  height: 32px;
  transform: ${(props) => (props.open ? "rotate(0deg)" : "rotate(180deg)")};
  transition: transform 0.3s ease-in-out;
`;

const ContextMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { account } = useAccountStore();

  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const username = account.info.member_username;

  return (
    <>
      <ContextMenuButtonContainer onClick={handleClick}>
        {/* <AvatarContainer /> */}
        <Avatar size={"small"} hideName={true} />

        <UsernameContainer>{username}</UsernameContainer>

        <ArrowContainer open={isOpen}>
          <SvgIcon pathname={arrowImg} />
        </ArrowContainer>
      </ContextMenuButtonContainer>
      <Modal open={isOpen} onClose={handleClick}>
        <ContextMenu />
      </Modal>
    </>
  );
};

export default ContextMenuButton;
