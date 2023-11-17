import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import ContextMenuButton from "@/layouts/components/Header/components/ContextMenuButton";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6.5px;
`;

const AccountHeaderContent = () => {
  const history = useHistory();

  const handleDeposit = () => {
    history.push("/deposit");
  };

  return (
    <ButtonContainer>
      <HeaderButton
        onClick={handleDeposit}
        style={{
          background: "linear-gradient(180deg, #91C538 0%, #648626 100%)",
        }}
      >
        {i18n.t("common.deposit")}
      </HeaderButton>

      <ContextMenuButton />
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
