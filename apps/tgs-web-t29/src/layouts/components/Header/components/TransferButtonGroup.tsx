import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import config, { mapBrandName, brandConfig } from "@tgs-web-nx/config";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TransferButtonGroup = () => {
  const history = useHistory();
  const isShowAgentAdminButton = brandConfig[mapBrandName(config.brand)].isShowAgentAdminButton;

  const handleGotoTransfer = useCallback(() => {
    history.push("/transfer");
  }, []);

  const handleGotoAgentAdmin = useCallback(() => {
    if (config.AgentAdminUrl) {
      window.open(config.AgentAdminUrl, "_blank");
    }
  }, []);

  const handleGotoWithdrawal = useCallback(() => {
    history.push("/withdrawal");
  }, []);

  const handleGotoDeposit = useCallback(() => {
    history.push("/deposit");
  }, []);

  return (
    <ButtonContainer>
      {isShowAgentAdminButton ? (
        <HeaderButton
          onClick={handleGotoAgentAdmin}
          style={{
            background: theme.secondary,
          }}
        >
          <>{i18n.t("usertype.agent")}</>
        </HeaderButton>
      ) : (
        <HeaderButton
          onClick={handleGotoTransfer}
          style={{
            background: "#00B2B9",
          }}
        >
          <>{i18n.t("common.transfer")}</>
        </HeaderButton>
      )}

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
