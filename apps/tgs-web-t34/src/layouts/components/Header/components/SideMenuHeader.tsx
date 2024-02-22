import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import BrandLogo from "@/components/project/BrandLogo";

const SideMenuHeaderContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 44px;
  background: ${({ theme }) => theme.black};
  display: flex;
  align-items: center;
  gap: 23.5px;
`;

const CloseIconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SideMenuHeader = () => {
  const { handleToggleMenu } = useHeader();
  const { handleChangeGameType } = useHomeGameContext();
  const history = useHistory();

  const backToHome = () => {
    handleChangeGameType(GameTypeEnum.NONE);
    history.push(`/`);
    handleToggleMenu(false);
  }

  return (
    <SideMenuHeaderContainer>
      <CloseIconContainer onClick={() => handleToggleMenu(false)}>
        <CloseIcon
          style={{
            color: "white",
          }}
        />
      </CloseIconContainer>
      <BrandLogo style={{ height: "28px", margin: 0 }} onClick={() => backToHome()} />
    </SideMenuHeaderContainer>
  );
};

export default SideMenuHeader;
