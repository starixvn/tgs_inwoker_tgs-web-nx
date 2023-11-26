import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { DESKTOP_HEADER_HEIGHT } from "@/theme/constants";
import GameTypeNavPopupContent from "@/layouts/components/Header/components/GameTypeNavPopupContent";

export const PopupBg = styled.div<{ $isHovered: boolean }>`
  display: ${($isHovered) => ($isHovered ? "block" : "none")};
  width: 100%;
  position: fixed;
  top: ${DESKTOP_HEADER_HEIGHT};
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(245, 245, 245, 0.274);
  z-index: 1;
  height: 45vh;

  border: 1px solid red;

`;

export const PopupBody = styled.div`
  width: 100%;
  min-width: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid blue;

`;

const GameTypeNavPopup = ({ isHovered }: Props) => {
  return (
    <PopupBg $isHovered={isHovered}>
      <PopupBody>
        <GameTypeNavPopupContent />
      </PopupBody>
    </PopupBg>
  );
};

export default GameTypeNavPopup;
