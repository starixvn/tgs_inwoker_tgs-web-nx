import { CloseIcon } from "@/components/UI/CustomizeIcon";
import React from "react";
import styled from "styled-components";

const PopupHeaderContainer = styled.div`
  background: ${({ theme }) => theme.secBTNBGC};
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
`;

type Props = {
  title: string;
  handleClose: () => void;
};
const PopupHeader = ({ title, handleClose }: Props) => {
  return (
    <PopupHeaderContainer>
      <IconContainer onClick={handleClose}>
        <CloseIcon
          sx={{
            position: "absolute",
            top: "1.9rem",
            right: "2.4rem !important",
            width: "3.2rem",
            height: "3.2rem",
            color: "#324354",
            zIndex: "4",
            cursor: "pointer",
            "&:hover": {
              color: "#6F7E93",
            },
          }}
          viewBox="0 0 33 32"
          className="icon-close"
        />
      </IconContainer>
    </PopupHeaderContainer>
  );
};

export default PopupHeader;
