import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import Icon from "../../../../../tgs-web-t34/src/components/project/Icon";
import iconImg from "@/assets/t18/images/withdraw/manage-card-icon.svg";

const ButtonContainer = styled.div`
  cursor: pointer;
  font-weight: 400;
  font-size: 0.937rem;
  line-height: 1.098rem;
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.secondary};
  padding: 10px 22px;
  border-radius: 50px;
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 7.5px;
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
