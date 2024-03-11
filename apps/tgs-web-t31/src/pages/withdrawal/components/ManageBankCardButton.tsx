import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import Icon from "@/components/project/Icon";
import iconImg from "@/assets/t31/images/withdraw/manage-card-icon.png";

const ButtonContainer = styled.div`
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
  color: ${({ theme }) => theme.neutralBlack};
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.priBTNOutline};
  padding: 10px 22px;
  gap: 8px;
  border-radius: 100px;
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
