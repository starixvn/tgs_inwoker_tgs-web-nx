import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import iconReturn from "@/assets/t25/images/dialog/icon-return.svg";
import Icon from "@/components/project/Icon";
import { MOBILE_DIALOG_HEADER_HEIGHT } from "@/theme/constants";

const DialogHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(${MOBILE_DIALOG_HEADER_HEIGHT});
  background: ${({ theme }) => theme.black03};
  color: ${({ theme }) => theme.white};
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  z-index: 1300;
  padding: 20px 22px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReturnIconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 23px;
  left: 16px;
`;

type Props = {
  handleClose: () => void;
  dialogHeaderTitle: string;
};

const DialogHeader = ({ dialogHeaderTitle, handleClose }: Props) => {
  const width = "24px";

  return (
    <DialogHeaderContainer>
      <ReturnIconContainer onClick={handleClose}>
        <Icon iconUrl={iconReturn} width={width} height={width} />
      </ReturnIconContainer>

      {dialogHeaderTitle}
    </DialogHeaderContainer>
  );
};

export default DialogHeader;
