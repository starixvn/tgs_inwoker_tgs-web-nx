import React from "react";
import styled from "styled-components";
import iconReturn from "@/assets/t24/images/layout/icon-return.svg";
import Icon from "@/components/project/Icon";

const DialogHeaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 64px;
  background: ${({ theme }) => theme.mainBackground};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.white};
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0;
  z-index: 1300;
  padding: 0 22px;
`;

const Title = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
`;

type Props = {
  handleClose: () => void;
  dialogHeaderTitle: string;
};

const DialogHeader = ({ dialogHeaderTitle, handleClose }: Props) => {
  return (
    <DialogHeaderContainer>
      <Icon
        iconUrl={iconReturn}
        width={"16px"}
        height={"16px"}
        style={{ marginRight: "14px", cursor: "pointer" }}
        onClick={handleClose}
      />
      <Title>{dialogHeaderTitle}</Title>
    </DialogHeaderContainer>
  );
};

export default DialogHeader;
