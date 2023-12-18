import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useAuthContext } from "@tgs-web-nx/core/features";
import ContextMenuButton from "@/layouts/components/Header/components/ContextMenuButton";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import promotionIcon from "@/assets/t30/images/header/icon-promotion.svg";
import inboxIcon from "@/assets/t30/images/header/icon-inbox.svg";
import logoutIcon from "@/assets/t30/images/header/icon-logout.svg";
import Icon from "@/components/project/Icon";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IconButton = styled.div`
  background: #276aa5;
  padding: 6px;
  cursor: pointer;
  border-radius: 3px;
`;

const AccountHeaderContent = () => {
  const history = useHistory();
  const { handleLogout } = useAuthContext();

  const handleDeposit = () => {
    history.push("/deposit");
  };

  const handleGoToPromotion = () => {
    history.push("/promotion-list");
  };

  const handleGotoInbox = () => {
    history.push("/inbox");
  };

  return (
    <ButtonContainer>
      <HeaderButton
        onClick={handleDeposit}
        style={{
          background: "linear-gradient(180deg, #91C538 0%, #648626 100%)",
        }}
      >
        {i18n.t("common.deposit")}
      </HeaderButton>

      <IconButton onClick={handleGoToPromotion}>
        <Icon iconUrl={promotionIcon} width={"20px"} height={"20px"} />
      </IconButton>

      <IconButton onClick={handleGotoInbox}>
        <Icon iconUrl={inboxIcon} width={"20px"} height={"20px"} />
      </IconButton>

      <ContextMenuButton />

      <IconButton onClick={handleLogout}>
        <Icon iconUrl={logoutIcon} width={"20px"} height={"20px"} />
      </IconButton>
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
