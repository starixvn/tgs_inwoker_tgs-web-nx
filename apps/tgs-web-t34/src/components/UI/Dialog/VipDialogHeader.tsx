import React from "react";
import styled from "styled-components";
import iconReturn from "@/assets/t34/images/layout/icon-return.svg";
import Icon from "@/components/project/Icon";
import { HEADER_HEIGHT } from "@/theme/constants";

const DialogHeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  height: ${HEADER_HEIGHT} ;
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

const VipDialogHeader = ({ dialogHeaderTitle, handleClose }: Props) => {
  return (
    <DialogHeaderContainer>
      {dialogHeaderTitle}

      <ReturnIconContainer onClick={handleClose}>
        <Icon iconUrl={iconReturn} width={"14.82px"} height={"25px"} />
      </ReturnIconContainer>
    </DialogHeaderContainer>
  );
};

export default VipDialogHeader;
