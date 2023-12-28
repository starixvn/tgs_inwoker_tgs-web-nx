import React, { useState } from "react";
import styled from "styled-components";
import avatarImg from "@/assets/t25/images/account/avatar.svg";
import HeaderMenu from "@/layouts/components/Header/components/ContextMenuButton/components/HeaderMenu";
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

      <Modal open={isOpen} onClose={() => handleClick(false)}>
        <HeaderMenu handleCloseContextMenu={() => handleClick(false)} />
      </Modal>
    </>
  );
};

export default ContextMenuButton;
