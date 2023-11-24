import styled from "styled-components";
import { DESKTOP_HEADER_HEIGHT } from "@/theme/constants";
import GameTypeNavPopupContent from "@/layouts/components/Header/components/GameTypeNavPopupContent";

export const PopupBg = styled.div`
  width: 100%;
  height: 100%;
  max-height: 450px;
  position: fixed;
  top: ${DESKTOP_HEADER_HEIGHT};
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.90);
  z-index: 1;
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

export const PopupBox = styled.div`
  width: 88%;
  position: relative;
  border-radius: 20px;
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