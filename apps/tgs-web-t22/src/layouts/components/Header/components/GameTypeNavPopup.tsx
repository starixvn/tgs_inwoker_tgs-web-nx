import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { DESKTOP_HEADER_HEIGHT } from "@/theme/constants";
import GameTypeNavPopupContent from "@/layouts/components/Header/components/GameTypeNavPopupContent";

export const PopupBg = styled.div<{
  $isHovered: boolean;
}>`
  display: ${({$isHovered}) => ($isHovered ? "block" : "none")};
  padding: 0 20px 20px;
  position: fixed;
  top: ${DESKTOP_HEADER_HEIGHT};
  left: 0;
  z-index: 5;
  background: rgba(255, 255, 255, .9);
  width: 100%;
`;

export const PopupBody = styled.div`
  width: 100%;
`;

const GameTypeNavPopup = () => {
  const { setIsHovered, isHovered } = useHomeGameContext();
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <PopupBg
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      $isHovered={isHovered}
    >
      <PopupBody>
        <GameTypeNavPopupContent />
      </PopupBody>
    </PopupBg>
  );
};

export default GameTypeNavPopup;
