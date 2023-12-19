import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAccountStore } from "@tgs-web-nx/core";
import { useHistory } from "react-router-dom";
import ContextMenuButton from "@/layouts/components/Header/components/ContextMenuButton";
import BalanceTracker from "@/components/project/BalanceTracker";
import TransferButtonGroup from "@/layouts/components/Header/components/TransferButtonGroup";
import iconMessage from "@/assets/t24/images/header/icon-message.svg";
import Icon from "@/components/project/Icon";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 9.5px;
`;

const VipLevel = styled.div`
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.gray10};
  cursor: pointer;
`;

const AccountHeaderContent = () => {
  const { isDesktopSize } = useRwd();
  const { account } = useAccountStore();
  const history = useHistory();
  const accountLevel = account.info.member_level_id;

  const goToInbox = () => {
    history.push("/inbox");
  };

  const goToVip = () => {
    history.push("/vip");
  };

  return (
    <ButtonContainer>
      {isDesktopSize && (
        <>
          <VipLevel onClick={goToVip}>Vip{accountLevel}</VipLevel>
          <Icon
            iconUrl={iconMessage}
            width={"36px"}
            height={"36px"}
            style={{ cursor: "pointer" }}
            onClick={goToInbox}
          />
          <ContextMenuButton />
        </>
      )}

      <BalanceTracker size={"small"} />
      <TransferButtonGroup />

      {!isDesktopSize && <ContextMenuButton />}
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
