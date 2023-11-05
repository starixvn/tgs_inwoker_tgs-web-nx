import React, { useCallback } from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import { HeaderButton } from "@/components/layouts/Header/components/HeaderButton";
import { useHistory } from "react-router";
import { useHeader } from "@/core/feature/useHeader";
import ContextMenuButton from "@/components/layouts/Header/components/ContextMenuButton";
import { useRwd } from "@/core/hooks/tools/useRwd";
import MenuButton from "@/components/layouts/Header/components/MenuButton";
import BalanceTracker from "@/components/project/BalanceTracker";
import TransferButtonGroup from "@/components/layouts/Header/components/TransferButtonGroup";

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
