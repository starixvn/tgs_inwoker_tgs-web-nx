import React, { useState } from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import { useAuth } from "@tgs-web-nx/core/features";
import ContextMenu from "@/layouts/components/Header/components/ContextMenuButton/components/ContextMenu";
import avatarImg from "@/assets/t23/images/account/avatar.svg";
import Modal from "@/components/UI/Modal";
import { media } from "@/theme/breakpoints";
import Loading from "@/components/UI/Loading";
import arrowImg from "@/assets/t23/images/header/contextMenu/icon_arrow.svg";
import Icon from "@/components/project/Icon";

const ContextMenuButtonContainer = styled.div`
  height: 36px;
  padding: 8px 15px;
  border-radius: 50px;
  background: ${({ theme }) => theme.mainLightBackground};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  gap: 10px;
`;

const AvatarContainer = styled.div`
  width: 20px;
  height: 20px;
  background: url(${avatarImg}) no-repeat center center;
  background-size: cover;
`;

const UsernameContainer = styled.div`
  display: none;

  ${media.sm} {
    display: block;
    color: #596578;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.318rem;
    text-overflow: ellipsis;
    max-width: 60px;
    text-align: center;
  }
`;

const ArrowContainer = styled.div<{
  open: boolean;
}>`
  transform: ${(props) => (props.open ? "rotate(0deg)" : "rotate(180deg)")};
  transition: transform 0.3s ease-in-out;
`;

const ContextMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logoutState } = useAuth();
  const { account } = useAccountStore();

  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const username = account.info.member_username;

  return (
    <>
      <ContextMenuButtonContainer onClick={handleClick}>
        <AvatarContainer />

        <UsernameContainer>{username}</UsernameContainer>

        <ArrowContainer open={isOpen}>
          <Icon iconUrl={arrowImg} width={"15px"} height={"9px"} />
        </ArrowContainer>
      </ContextMenuButtonContainer>

      <Modal open={isOpen} onClose={handleClick}>
        <ContextMenu />
      </Modal>

      <Loading show={logoutState.isLoading} noShrink={true} />
    </>
  );
};

export default ContextMenuButton;
