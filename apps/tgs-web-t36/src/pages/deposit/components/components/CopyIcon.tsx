import React from "react";
import styled from "styled-components";
import { i18n, utility } from "@tgs-web-nx/utils";
import { useNotifications } from "@tgs-web-nx/core/features";
import Icon from "@/components/project/Icon";
import copyImg from "@/assets/t36/images/deposit/copy.png";

const CopyIconContainer = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;

  transition: all ease-in-out 0.2s;
  &:hover {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.white};
  }
`;

type Props = {
  copyContent: any;
};
const CopyIcon = ({ copyContent }: Props) => {
  const { alert } = useNotifications();

  const performCopy = (content: any) => {
    alert("", i18n.t("affiliate.copied"));

    utility.copy(content);
  };

  return (
    <CopyIconContainer
      onClick={() => {
        performCopy(copyContent);
      }}
    >
      <Icon iconUrl={copyImg} width={"20px"} height={"20px"} />
    </CopyIconContainer>
  );
};

export default CopyIcon;
