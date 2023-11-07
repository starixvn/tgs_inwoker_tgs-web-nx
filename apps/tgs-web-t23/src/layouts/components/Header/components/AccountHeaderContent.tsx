import React from "react";
import styled from "styled-components";
import ContextMenuButton from "@/layouts/components/Header/components/ContextMenuButton";
import { useRwd } from "@/core/hooks/tools/useRwd";
import BalanceTracker from "@/components/project/BalanceTracker";
import TransferButtonGroup from "@/layouts/components/Header/components/TransferButtonGroup";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const AccountHeaderContent = () => {
  const { isMobileSize } = useRwd();

  return (
    <ButtonContainer>
      <TransferButtonGroup />

      {!isMobileSize && <BalanceTracker size={"small"} />}
      {!isMobileSize && <ContextMenuButton />}
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
