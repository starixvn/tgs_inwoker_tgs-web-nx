import React, { useState } from "react";
import styled from "styled-components";
import { useAuthContext } from "@tgs-web-nx/core/features";
import ContextMenu from "@/layouts/components/Header/components/ContextMenuButton/components/ContextMenu";
import avatarImg from "@/assets/t24/images/contextButton/icon.svg";
import Modal from "@/components/UI/Modal";
import Loading from "@/components/UI/Loading";

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

const ContextMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logoutState } = useAuthContext();

  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <ContextMenuButtonContainer onClick={handleClick}>
        <AvatarContainer />
      </ContextMenuButtonContainer>

      <Modal open={isOpen} onClose={handleClick}>
        <ContextMenu />
      </Modal>
    </>
  );
};

export default ContextMenuButton;
