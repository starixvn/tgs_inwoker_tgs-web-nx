import React from "react";
import styled from "styled-components";
import closeIcon from "@/assets/t27/images/dialog/icon-close.svg";
import Icon from "@/components/project/Icon";
import { DIALOG_HEADER_HEIGHT } from "@/theme/constants";

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

const ReturnIconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 17px;
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
        <Icon iconUrl={closeIcon} width={"20px"} height={"20px"} />
      </ReturnIconContainer>

      {dialogHeaderTitle}
    </DialogHeaderContainer>
  );
};

export default DialogHeader;
