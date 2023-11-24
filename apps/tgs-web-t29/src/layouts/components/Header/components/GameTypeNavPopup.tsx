import styled from "styled-components";
import { DESKTOP_HEADER_HEIGHT } from "@/theme/constants";
import GameTypeNavPopupContent from "@/layouts/components/Header/components/GameTypeNavPopupContent";

export const PopupBg = styled.div`
  width: 100%;
  position: fixed;
  top: ${DESKTOP_HEADER_HEIGHT};
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(245, 245, 245, 0.274);
  z-index: 1;
  height: 45vh;
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
`;

const GameTypeNavPopup = () => {
  return (
    <PopupBg>
      <PopupBody>
        <GameTypeNavPopupContent />
      </PopupBody>
    </PopupBg>
  );
}

export default GameTypeNavPopup;