import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import accountIcon from "@/assets/t19/images/header/sideMenuItem/icon-profile.svg";
import depositIcon from "@/assets/t19/images/bottomAppBar/icon-deposit.svg";
import withdrawIcon from "@/assets/t19/images/bottomAppBar/icon-withdraw.svg";
import Icon from "@/components/project/Icon";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 24px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
`;

const HeaderButton = styled.div`
  width: 85px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 0.875rem;
  font-weight: 400;
`;

const TransferButtonGroup = () => {
  const history = useHistory();

  const handleGotoTransfer = useCallback(() => {
    history.push("/account");
  }, []);

  const handleGotoDeposit = useCallback(() => {
    history.push("/deposit");
  }, []);

  const handleGotoWithdrawal = useCallback(() => {
    history.push("/withdrawal");
  }, []);

  return (
    <ButtonContainer>
      <HeaderButton
        onClick={handleGotoTransfer}
      >
        <Icon
          iconUrl={accountIcon}
          width={"32px"}
          height={"32px"}
        />
        <Text>{i18n.t("deposit.details.account")}</Text>
      </HeaderButton>

      <HeaderButton
        onClick={handleGotoDeposit}
      >
        <Icon
          iconUrl={depositIcon}
          width={"32px"}
          height={"32px"}
        />
        <Text>{i18n.t("common.deposit")}</Text>
      </HeaderButton>

      <HeaderButton
        onClick={handleGotoWithdrawal}
      >
        <Icon
          iconUrl={withdrawIcon}
          width={"32px"}
          height={"32px"}
        />
        <Text>{i18n.t("common.withdrawal")}</Text>
      </HeaderButton>
    </ButtonContainer>
  );
};

export default TransferButtonGroup;
