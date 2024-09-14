import { HeaderButton } from "@/components/UI/Button";
import { i18n } from "@tgs-web-nx/utils";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TransferButtonGroup = () => {
  const history = useHistory();

  const handleGotoTransfer = useCallback(() => {
    history.push("/transfer");
  }, []);

  const handleGotoWithdrawal = useCallback(() => {
    history.push("/withdrawal");
  }, []);

  const handleGotoDeposit = useCallback(() => {
    history.push("/deposit");
  }, []);
  return (
    <ButtonContainer>
      <HeaderButton
        onClick={handleGotoTransfer}
        style={{
          background: "#00B2B9",
        }}
      >
        <>{i18n.t("common.transfer")}</>
      </HeaderButton>

      <HeaderButton
        color={"primary"}
        onClick={handleGotoDeposit}
        style={{
          background: "#FFA84D",
        }}
      >
        <>{i18n.t("common.deposit")}</>
      </HeaderButton>

      <HeaderButton
        onClick={handleGotoWithdrawal}
        style={{
          background: "#FFA84D",
        }}
      >
        <>{i18n.t("common.withdrawal")}</>
      </HeaderButton>
    </ButtonContainer>
  );
};

export default TransferButtonGroup;
