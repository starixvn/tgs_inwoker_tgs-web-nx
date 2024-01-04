import React from "react";
import styled from "styled-components";
import iconReturn from "@/assets/t29/images/dialog/icon-return.svg";
import Icon from "@/components/project/Icon";

export const DIALOG_HEADER_HEIGHT = "40px";

const DialogHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${DIALOG_HEADER_HEIGHT};
  background: ${({ theme }) => theme.mainBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
  z-index: 1300;
  padding: 22px 10px;
  gap: 14px;
`;

const ReturnIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
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
        <Icon iconUrl={iconReturn} width={"20px"} height={"20px"} />
      </ReturnIconContainer>

      {dialogHeaderTitle}
    </DialogHeaderContainer>
  );
};

export default DialogHeader;
