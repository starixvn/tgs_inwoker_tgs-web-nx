import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import Icon from "@/components/project/Icon";
import iconImg from "@/assets/t26/images/withdraw/manage-card-icon.svg";

const ButtonContainer = styled.div`
  cursor: pointer;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.15rem;
  color: ${({ theme }) => theme.black};
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.primary};
  padding: 10px 22px;
  gap: 8px;
`;

type Props = {
  handleManageCardClick: () => void;
};

const ManageBankCardButton = ({ handleManageCardClick }: Props) => {
  return (
    <ButtonContainer onClick={handleManageCardClick}>
      <Icon iconUrl={iconImg} width={"14px"} height={"14px"} />
      {i18n.t("withdrawal.manageBank")}
    </ButtonContainer>
  );
};

export default ManageBankCardButton;
