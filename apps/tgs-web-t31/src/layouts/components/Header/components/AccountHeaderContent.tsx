import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import ContextMenuButton from "@/layouts/components/Header/components/ContextMenuButton";
import BalanceTracker from "@/components/project/BalanceTracker";
import TransferButtonGroup from "@/layouts/components/Header/components/TransferButtonGroup";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const AccountHeaderContent = () => {
  const { isDesktopSize, isLargeDesktopSize } = useRwd();

  return (
    <ButtonContainer>
      <TransferButtonGroup />

      {isDesktopSize && <BalanceTracker size={"small"} />}
      {isLargeDesktopSize && <ContextMenuButton />}
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
