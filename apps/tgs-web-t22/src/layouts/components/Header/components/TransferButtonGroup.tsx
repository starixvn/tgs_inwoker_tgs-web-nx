import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { RoundHeaderButton } from "@/layouts/components/Header/components/HeaderButton";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TransferButtonGroup = () => {
  const history = useHistory();

  // const handleGotoTransfer = useCallback(() => {
  //   history.push("/transfer");
  // }, []);

  const handleGotoWithdrawal = useCallback(() => {
    history.push("/withdrawal");
  }, []);

  const handleGotoDeposit = useCallback(() => {
    history.push("/deposit");
  }, []);

  return (
    <ButtonContainer>

      <RoundHeaderButton onClick={handleGotoDeposit}>
        {i18n.t("common.deposit")}
      </RoundHeaderButton>

      <RoundHeaderButton onClick={handleGotoWithdrawal}>
        {i18n.t("common.withdrawal")}
      </RoundHeaderButton>

    </ButtonContainer>
  );
};

export default TransferButtonGroup;
