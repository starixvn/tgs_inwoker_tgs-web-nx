import React, { useState } from "react";
import styled from "styled-components";
import ContextMenu from "@/layouts/components/Header/components/ContextMenuButton/components/ContextMenu";
import avatarImg from "@/assets/t33/images/account/avatar.svg";
import Modal from "@/components/UI/Modal";

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
