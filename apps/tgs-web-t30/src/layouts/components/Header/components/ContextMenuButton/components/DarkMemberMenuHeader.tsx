import React from "react";
import styled from "styled-components";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import headerImg from "@/assets/t30/images/account/header.png";

const DarkMemberMenuHeaderContainer = styled.div`
  width: 100%;
  background: url(${headerImg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 40px 20px;
`;

const Username = styled.div`
  color: ${({ theme }) => theme.blue};
`;
const Balance = styled.div`
  color: ${({ theme }) => theme.blue};
`;

type Props = {};

const DarkMemberMenuHeader = (props: Props) => {
  const { wallet } = useWalletStore();
  const { account } = useAccountStore();
  const username = account.info.member_username;
  const accountLevel = account.info.member_level_id;
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();

  const currentBalance =
    mainSymbol + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);
  return (
    <DarkMemberMenuHeaderContainer>
      <Username>{`${i18n.t("panel.liveChatWelcome")}, ${username}`}</Username>
      <Balance>${currentBalance}</Balance>
    </DarkMemberMenuHeaderContainer>
  );
};

export default DarkMemberMenuHeader;
