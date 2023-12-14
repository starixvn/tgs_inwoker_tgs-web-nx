import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import iconImg from "@/assets/t18/images/withdraw/manage-card-icon.svg";
import Icon from "@/components/project/Icon";

const ButtonContainer = styled.div`
  cursor: pointer;
  font-weight: 400;
  font-size: 0.937rem;
  line-height: 1.098rem;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 19px;
  border-radius: 5px;
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
