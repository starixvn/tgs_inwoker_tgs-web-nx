import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAccountStore } from "@tgs-web-nx/core";
import BalanceTracker from "@/components/project/BalanceTracker";
import Icon from "@/components/project/Icon";
import iconInbox from "@/assets/t29/images/header/icon-inbox.svg";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6.5px;
`;

const UsernameContainer = styled.div`
  font-size: 0.732rem;
  font-weight: 300;
  color: ${({ theme }) => theme.gray50};
`;

const InboxIconContainer = styled.div`
  cursor: pointer;
`;

const AccountHeaderContent = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const username = account.info.member_username;

  const handleGoToInbox = () => {
    history.push("/inbox");
  };

  return (
    <ButtonContainer>
      <UsernameContainer>{username}</UsernameContainer>
      <BalanceTracker size={"small"} />

      <InboxIconContainer onClick={handleGoToInbox}>
        <Icon iconUrl={iconInbox} width={"24px"} height={"24px"} />
      </InboxIconContainer>
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
