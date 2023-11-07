import React, { useCallback } from "react";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import i18n from "@/utils/i18n";
import { useHistory } from "react-router-dom";
import { useHeader } from "@/core/feature/useHeader";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

type Props = {
  buttonWidth?: string;
};
const TransferButtonGroup = ({ buttonWidth }: Props) => {
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
        onClick={handleGotoWithdrawal}
        style={{
          background: "linear-gradient(90deg, #7135F3 50.07%, #5E20CF 50.54%)",
          width: buttonWidth ?? "92px",
        }}
      >
        <>{i18n.t("common.withdrawal")}</>
      </HeaderButton>

      <HeaderButton
        color={"primary"}
        onClick={handleGotoDeposit}
        style={{
          background: "linear-gradient(90deg, #FACE27 53.32%, #F3AF16 53.95%)",
          width: buttonWidth ?? "92px",
        }}
      >
        <>{i18n.t("common.deposit")}</>
      </HeaderButton>
    </ButtonContainer>
  );
};

export default TransferButtonGroup;
