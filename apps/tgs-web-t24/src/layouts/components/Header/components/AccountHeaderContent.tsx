import React from "react";
import styled from "styled-components";
import ContextMenuButton from "@/layouts/components/Header/components/ContextMenuButton";
import BalanceTracker from "@/components/project/BalanceTracker";
import TransferButtonGroup from "@/layouts/components/Header/components/TransferButtonGroup";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const AccountHeaderContent = () => {
  return (
    <ButtonContainer>
      <BalanceTracker size={"small"} />
      <TransferButtonGroup />

      <ContextMenuButton />
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
