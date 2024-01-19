import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuth, useAuthContext, useHeader } from "@tgs-web-nx/core/features";
import TransferButtonGroup from "@/layouts/components/Header/components/TransferButtonGroup";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import BalanceButton from "@/layouts/components/Header/components/BalanceButton";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import ContextMenuButton from "@/layouts/components/Header/components/ContextMenuButton";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
`;

const AccountHeaderContent = () => {
  const { isDesktopSize, isLargeDesktopSize } = useRwd();
  const { handleLogout } = useAuthContext();
  const { isMenuOpen, handleToggleMenu } = useHeader();

  const {} = useAuth();

  const handleClickLogout = async () => {
    if (!isDesktopSize && isMenuOpen) {
      handleToggleMenu(false);
    }
    await handleLogout();
  };

  return (
    <ButtonContainer>
      <BalanceButton />

      {<TransferButtonGroup />}
      <HeaderLanguageSwitch />

      {<ContextMenuButton />}

      {isLargeDesktopSize && (
        <HeaderButton
          color={"primary"}
          onClick={handleClickLogout}
          style={{
            background: theme.grey06,
            color: theme.grey02,
            height: "100%",
          }}
        >
          <>{i18n.t("web.header.logout")}</>
        </HeaderButton>
      )}
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
