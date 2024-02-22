import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import BrandLogo from "@/components/project/BrandLogo";

const SideMenuHeaderContainer = styled.div`
  background: ${({ theme }) => theme.primary};
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 44px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SideMenuHeader = () => {
  const { handleToggleMenu } = useHeader();
  const { handleChangeGameType } = useHomeGameContext();

  const backToHome = () => {
    handleChangeGameType(GameTypeEnum.NONE)
    handleToggleMenu(false);
  }

  return (
    <SideMenuHeaderContainer>
      <CloseIcon
        onClick={() => handleToggleMenu(false)}
        style={{
          color: "white",
          width: "24px",
          height: "24px",
        }}
      />

      <BrandLogo style={{ margin: 0 }} onClick={() => backToHome()} />
    </SideMenuHeaderContainer>
  );
}
export default SideMenuHeader;
