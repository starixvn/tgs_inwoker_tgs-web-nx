import React from "react";
import styled from "styled-components";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import { Close as CloseIcon } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import closeIcon from "@/assets/t30/images/header/icon-avatar.svg";

import bg from "@/assets/t30/images/header/header-background.png";
import Icon from "@/components/project/Icon";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import { Button } from "@/components/UI/Button";

const MemberMenuHeaderContainer = styled.div`
  background: url(${bg}) center;
  background-size: cover;
  overflow: visible;

  color: ${({ theme }) => theme.black};
  height: 176px;
  padding: 40px 20px;
`;

const UsernameContainer = styled.div`
  color: ${({ theme }) => theme.blue};
  font-size: 0.875rem;
  line-height: 0.875rem;
  margin-bottom: 10px;
`;
const BalanceContainer = styled.div`
  color: ${({ theme }) => theme.blue};
  font-size: 0.875rem;
  line-height: 0.875rem;
  margin-bottom: 23px;
`;

const CloseButtonContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 100%;
  width: 64px;
  height: 64px;
  background: ${({ theme }) => theme["515c"]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  handleCloseContextMenu: () => void;
};

const MemberMenuHeader = ({ handleCloseContextMenu }: Props) => {
  const { wallet } = useWalletStore();
  const { account } = useAccountStore();
  const history = useHistory();
  const username = account.info.member_username;
  const currentBalance = `${Common.formatNumberWithThousand(wallet.mainBalance)}`;

  const handleDeposit = () => {
    history.push("/deposit");
  };

  return (
    <MemberMenuHeaderContainer>
      <UsernameContainer>{`${i18n.t("panel.liveChatWelcome")}, ${username}`}</UsernameContainer>
      <BalanceContainer>${currentBalance}</BalanceContainer>
      <Button fullWidth onClick={handleDeposit}>
        {i18n.t("common.deposit")}
      </Button>

      <CloseButtonContainer onClick={() => handleCloseContextMenu()}>
        <CloseIcon
          style={{
            color: "white",
            width: "20px",
            height: "20px",
          }}
        />
      </CloseButtonContainer>
    </MemberMenuHeaderContainer>
  );
};

export default MemberMenuHeader;
