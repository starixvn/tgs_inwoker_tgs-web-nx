import React, { useCallback } from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { useHistory } from "react-router-dom";
import { useHeader } from "@/core/feature/useHeader";
import ContextMenuButton from "@/layouts/components/Header/components/ContextMenuButton";
import { useRwd } from "@/core/hooks/tools/useRwd";
import MenuButton from "@/layouts/components/Header/components/MenuButton";
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
      <BalanceTracker size={"small"} />
      <TransferButtonGroup />

      <ContextMenuButton />
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
