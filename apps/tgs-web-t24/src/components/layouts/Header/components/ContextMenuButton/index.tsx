import React, { useState } from "react";
import styled from "styled-components";
import ContextMenu from "@/components/layouts/Header/components/ContextMenuButton/components/ContextMenu";
import avatarImg from "@/assets/t24/images/contextButton/icon.svg";
import Modal from "@/components/UI/Modal";
import { useAccountStore } from "@/core/stores/useAccountStore";
import { media } from "@/theme/breakpoints";
import Loading from "@/components/UI/Loading";
import { useAuth } from "@/core/feature/useAuth";

const ContextMenuButtonContainer = styled.div`
  height: 36px;
  width: 36px;
  padding: 10px;
  border-radius: 4px;
  background: ${({ theme }) => theme.mainBackground};
  border: 1px solid ${({ theme }) => theme.gray80};
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
      </ContextMenuButtonContainer>

      <Modal open={isOpen} onClose={handleClick}>
        <ContextMenu />
      </Modal>

      <Loading show={logoutState.isLoading} noShrink={true} />
    </>
  );
};

export default ContextMenuButton;
