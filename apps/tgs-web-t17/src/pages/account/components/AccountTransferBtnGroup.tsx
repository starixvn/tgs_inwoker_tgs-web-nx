import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useHeader } from "@tgs-web-nx/core/features";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

type Props = {
  buttonWidth?: string;
};
const AccountTransferBtnGroup = ({ buttonWidth }: Props) => {
  const history = useHistory();
  const { handleToggleMenu } = useHeader();

  const handleGotoWithdrawal = useCallback(() => {
    handleToggleMenu(false);
    history.push("/withdrawal");
  }, []);

  const handleGotoDeposit = useCallback(() => {
    handleToggleMenu(false);
    history.push("/deposit");
  }, []);
  return (
    <ButtonContainer>
      <HeaderButton
        onClick={handleGotoDeposit}
        style={{
          background: theme.primaryGradient,
          width: buttonWidth ?? "87px",
        }}
      >
        <>{i18n.t("common.deposit")}</>
      </HeaderButton>

      <HeaderButton
        color={"primary"}
        onClick={handleGotoWithdrawal}
        style={{
          background: theme.primaryGradient,
          width: buttonWidth ?? "112px",
        }}
      >
        <>{i18n.t("common.withdrawal")}</>
      </HeaderButton>
    </ButtonContainer>
  );
};

export default AccountTransferBtnGroup;
