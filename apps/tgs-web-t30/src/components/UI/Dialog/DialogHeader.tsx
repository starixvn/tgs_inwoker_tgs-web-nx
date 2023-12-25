import React from "react";
import styled from "styled-components";
import iconReturn from "@/assets/t30/images/layout/icon-return.svg";
import Icon from "@/components/project/Icon";
import { MOBILE_HEADER_HEIGHT } from "@/theme/constants";

export const DIALOG_HEADER_HEIGHT = "50px";

const DialogHeaderContainer = styled.div`
  position: fixed;
  top: ${MOBILE_HEADER_HEIGHT};
  left: 0;
  width: 100%;
  height: ${DIALOG_HEADER_HEIGHT};
  background: ${({ theme }) => theme.mainBackground};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.white};
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
  z-index: 10;
  gap: 14px;
`;

const ReturnIconContainer = styled.div`
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
        <Icon iconUrl={iconReturn} width={"50px"} height={"50px"} />
      </ReturnIconContainer>

      {dialogHeaderTitle}
    </DialogHeaderContainer>
  );
};

export default DialogHeader;
