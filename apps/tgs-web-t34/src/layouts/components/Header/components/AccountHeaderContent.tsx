import React from "react";
import styled from "styled-components";
import ContextMenuButton from "@/layouts/components/Header/components/ContextMenuButton";
import BalanceTracker from "@/components/project/BalanceTracker";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AccountHeaderContent = () => {
  return (
    <ButtonContainer>
      <ContextMenuButton />
      <BalanceTracker size={"small"} />
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
