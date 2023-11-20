import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ContextMenuButton from "@/layouts/components/Header/components/ContextMenuButton";
import BalanceTracker from "@/components/project/BalanceTracker";
import Icon from "@/components/project/Icon";
import iconDeposit from "@/assets/t33/images/header/icon-deposit.svg";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6.5px;
`;

const DepositIconContainer = styled.div`
  cursor: pointer;
`;

const AccountHeaderContent = () => {
  const history = useHistory();

  const handleDeposit = () => {
    history.push("/deposit");
  };

  return (
    <ButtonContainer>
      <DepositIconContainer onClick={handleDeposit}>
        <Icon iconUrl={iconDeposit} width={"33.53px"} height={"34.5px"} />
      </DepositIconContainer>

      <BalanceTracker size={"small"} />
      <ContextMenuButton />
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
