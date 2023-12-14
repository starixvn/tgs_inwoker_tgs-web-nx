import React, { useState } from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import ContextMenu from "@/layouts/components/Header/components/ContextMenuButton/components/ContextMenu";
import avatarImg from "@/assets/t24/images/contextButton/icon.svg";
import Modal from "@/components/UI/Modal";
import Icon from "@/components/project/Icon";
import iconAccount from "@/assets/t24/images/header/icon-account.svg";

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
  const { isDesktopSize } = useRwd();

  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      {isDesktopSize ? (
        <Icon
          onClick={handleClick}
          iconUrl={iconAccount}
          width={"36px"}
          height={"36px"}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <ContextMenuButtonContainer onClick={handleClick}>
          <AvatarContainer />
        </ContextMenuButtonContainer>
      )}

      <Modal open={isOpen} onClose={handleClick}>
        <ContextMenu />
      </Modal>
    </>
  );
};

export default ContextMenuButton;
