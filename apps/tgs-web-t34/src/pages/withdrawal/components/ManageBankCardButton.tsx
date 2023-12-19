import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import iconImg from "@/assets/t34/images/withdraw/icon-plus.svg";
import Icon from "@/components/project/Icon";

const ButtonContainer = styled.div`
  cursor: pointer;
  font-weight: 400;
  font-size: 0.937rem;
  line-height: 1.098rem;
  color: ${({ theme }) => theme.black};
  background: ${({ theme }) => theme.yellow};
  padding: 10px;
  border-radius: 50px;
  margin-top: 20px;

  display: flex;
  align-items: center;
  gap: 8px;
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
