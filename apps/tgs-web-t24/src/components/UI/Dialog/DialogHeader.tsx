import React from "react";
import styled from "styled-components";
import iconReturn from "@/assets/t24/images/layout/icon-return.svg";
import Icon from "@/components/project/Icon";

export const DIALOG_HEADER_HEIGHT = "64px";

const DialogHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${DIALOG_HEADER_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  font-weight: 700;
  margin: 0;
  z-index: 1300;
  padding: 22px 10px;
  gap: 14px;
`;

const Title = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
`;

const ReturnIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 17px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

type Props = {
  handleClose: () => void;
  dialogHeaderTitle: string;
};

const DialogHeader = ({ dialogHeaderTitle, handleClose }: Props) => {
  return (
    <DialogHeaderContainer>
      <ReturnIconContainer onClick={handleClose}>
        <Icon
          iconUrl={iconReturn}
          width={"16px"}
          height={"16px"}
        />
      </ReturnIconContainer>

      <Title>{dialogHeaderTitle}</Title>
    </DialogHeaderContainer>
  );
};

export default DialogHeader;
