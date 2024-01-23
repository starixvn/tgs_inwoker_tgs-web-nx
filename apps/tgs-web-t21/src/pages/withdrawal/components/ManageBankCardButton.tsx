import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import Icon from "@/components/project/Icon";
import iconImg from "@/assets/t18/images/withdraw/manage-card-icon.svg";

const ButtonContainer = styled.div`
  cursor: pointer;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.15rem;
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.primary};
  gap: 8px;
  border-radius: 5px;
  padding: 5px;
`;

type Props = {
  handleManageCardClick: () => void;
};

const ManageBankCardButton = ({ handleManageCardClick }: Props) => {
  return (
    <ButtonContainer onClick={handleManageCardClick}>
      <Icon iconUrl={iconImg} width={"24px"} height={"24px"} />
      {i18n.t("withdrawal.manageBank")}
    </ButtonContainer>
  );
};

export default ManageBankCardButton;
