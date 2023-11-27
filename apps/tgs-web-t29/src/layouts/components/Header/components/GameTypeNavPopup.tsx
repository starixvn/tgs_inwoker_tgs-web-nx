import styled, { css } from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { DESKTOP_HEADER_HEIGHT } from "@/theme/constants";
import GameTypeNavPopupContent from "@/layouts/components/Header/components/GameTypeNavPopupContent";

const popupStyles = css`
  display: ${(props: { $isHovered: any; }) => (props.$isHovered ? "block" : "none")};
  width: 100%;
  position: fixed;
  top: ${DESKTOP_HEADER_HEIGHT};
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.90);
  z-index: 1;
  height: 45vh;
`;

export const PopupBg = styled.div`
  ${popupStyles}
`;

export const PopupBody = styled.div`
  ${popupStyles}

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
  const { setIsHovered, isHovered } = useHomeGameContext();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // console.log("isHovered", isHovered);

  return (
    <PopupBg
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      $isHovered={isHovered}
    >
      <PopupBody $isHovered={isHovered}>
        <GameTypeNavPopupContent />
      </PopupBody>
    </PopupBg>
  );
};

export default GameTypeNavPopup;
