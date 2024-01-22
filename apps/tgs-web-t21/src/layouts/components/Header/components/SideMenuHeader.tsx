import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useHeader } from "@tgs-web-nx/core/features";
import iconReturn from "@/assets/t21/images/drawer/icon-return.svg";
import Icon from "@/components/project/Icon";

const SideMenuHeaderContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 11.14px 12.14px;
`;

const CloseIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  cursor: pointer;
`;

const SideMenuHeader = () => {
  const { handleToggleMenu } = useHeader();

  return (
    <SideMenuHeaderContainer>
      <CloseIconContainer onClick={() => handleToggleMenu(false)}>
        <Icon iconUrl={iconReturn} width={"21px"} height={"21px"} />
      </CloseIconContainer>
    </SideMenuHeaderContainer>
  );
};

export default SideMenuHeader;
