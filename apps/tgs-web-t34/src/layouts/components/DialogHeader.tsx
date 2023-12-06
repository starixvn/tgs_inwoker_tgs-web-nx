import React from "react";
import styled from "styled-components";
import { usePageName } from "@tgs-web-nx/core/features";
import iconArrow from "@/assets/t34/images/layout/icon-arrow.svg";
import Icon from "@/components/project/Icon";

const DialogHeaderContainer = styled.div`
  height: 60px;
  background: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  font-weight: 700;
`;

type Props = {
  handleClose: () => void;
};
const DialogHeader = ({ handleClose }: Props) => {
  const { pageName } = usePageName();
  return (
    <DialogHeaderContainer>
      <Icon
        iconUrl={iconArrow}
        width={"24px"}
        height={"24px"}
        onClick={handleClose}
        style={{ cursor: "pointer" }}
      />
      {pageName}
    </DialogHeaderContainer>
  );
};

export default DialogHeader;
