import React from "react";
import styled from "styled-components";
import iconReturn from "@/assets/t23/images/layout/icon-return.svg";
import Icon from "@/components/project/Icon";

export const DIALOG_HEADER_HEIGHT = "73px";

const DialogHeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  height: ${DIALOG_HEADER_HEIGHT};
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.mainDarkBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  z-index: 1300;
`;

const ReturnIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 27px;
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
      {dialogHeaderTitle}

      <ReturnIconContainer onClick={handleClose}>
        <Icon iconUrl={iconReturn} width={"14.82px"} height={"25px"} />
      </ReturnIconContainer>
    </DialogHeaderContainer>
  );
};

export default DialogHeader;
