import React from "react";
import styled from "styled-components";
import ContextMenuButton from "./ContextMenuButton";
import BalanceTracker from "@/components/project/BalanceTracker";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
type Props = {};
const AccountHeaderContent = (props: Props) => {
  return (
    <ButtonContainer>
      <BalanceTracker size={"small"} />
      <ContextMenuButton />
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
