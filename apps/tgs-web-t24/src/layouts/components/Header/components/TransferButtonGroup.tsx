import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import i18n from "@/utils/i18n";
import { useHeader } from "@/core/feature/useHeader";
import { theme } from "@/theme";

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

  const handleGotoDeposit = useCallback(() => {
    handleToggleMenu(false);
    history.push("/deposit");
  }, []);
  return (
    <ButtonContainer>
      <HeaderButton
        color={"primary"}
        onClick={handleGotoDeposit}
        style={{
          background: theme.primary,
          width: buttonWidth ?? "105px",
        }}
      >
        <>{i18n.t("common.deposit")}</>
      </HeaderButton>
    </ButtonContainer>
  );
};

export default TransferButtonGroup;
