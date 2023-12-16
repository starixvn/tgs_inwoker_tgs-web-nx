import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAccountStore } from "@tgs-web-nx/core";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "@tgs-web-nx/core/features";
import ContextMenuButton from "@/layouts/components/Header/components/ContextMenuButton";
import BalanceTracker from "@/components/project/BalanceTracker";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import Icon from "@/components/project/Icon";
import logoutIcon from "@/assets/t34/images/header/icon-logout.svg";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserInfo = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 0.875rem;
`;
const UserInfoRow = styled.div``;
const Username = styled.span`
  margin-left: 10px;
  font-weight: 700;
`;
const ProfileLink = styled(Link)`
  color: ${({ theme }) => theme.white};
`;

const BalanceInfo = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const BalanceInfoRow = styled.div``;

const AccountHeaderContent = () => {
  const { account } = useAccountStore();
  const username = account.info.member_username;
  const { isDesktopSize } = useRwd();
  const history = useHistory();
  const { handleLogout } = useAuthContext();

  const goToDeposit = () => {
    history.push("/deposit");
  };

  if (isDesktopSize) {
    return (
      <ButtonContainer>
        <UserInfo>
          <UserInfoRow>
            {i18n.t("panel.liveChatWelcome")}

            <Username>{username}</Username>
          </UserInfoRow>

          <UserInfoRow>
            <ProfileLink to={"/profile"}>{i18n.t("TIGER.my")}</ProfileLink>
          </UserInfoRow>
        </UserInfo>

        <BalanceInfo>
          <BalanceInfoRow>{i18n.t("wap.main.home.profile.mainAccount")}</BalanceInfoRow>
          <BalanceInfoRow>
            <BalanceTracker
              balanceTrackerSize={"small"}
              style={{ padding: 0, fontSize: "0.875rem", height: "initial" }}
            />
          </BalanceInfoRow>
        </BalanceInfo>

        <ContextMenuButton />

        <HeaderButton
          color={"primary"}
          onClick={goToDeposit}
          sx={{
            width: "77px",
            color: {
              xs: theme.secondary,
              sm: theme.white,
            },
            background: {
              sm: "#01B402",
            },
          }}
        >
          {i18n.t("common.deposit")}
        </HeaderButton>

        <Icon
          iconUrl={logoutIcon}
          width={"22px"}
          height={"22px"}
          onClick={handleLogout}
          style={{
            cursor: "pointer",
          }}
        />
      </ButtonContainer>
    );
  }

  return (
    <ButtonContainer>
      <ContextMenuButton />
      <BalanceTracker balanceTrackerSize={"small"} />
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
