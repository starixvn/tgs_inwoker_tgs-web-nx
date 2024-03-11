import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { MOBILE_HEADER_HEIGHT } from "@/theme/constants";

const DialogHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${MOBILE_HEADER_HEIGHT};
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

const CloseIconContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: ${MOBILE_HEADER_HEIGHT};
  height: ${MOBILE_HEADER_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${({ theme }) => theme["515c"]};
`;

type Props = {
  handleClose: () => void;
  dialogHeaderTitle: string;
};

const DialogHeader = ({ dialogHeaderTitle, handleClose }: Props) => {
  return (
    <DialogHeaderContainer>
      <CloseIconContainer onClick={handleClose}>
        <CloseIcon
          style={{
            color: "white",
          }}
        />
      </CloseIconContainer>

      {dialogHeaderTitle}
    </DialogHeaderContainer>
  );
};

export default DialogHeader;
