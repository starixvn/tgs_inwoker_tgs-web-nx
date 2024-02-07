import styled, { css } from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { DESKTOP_HEADER_HEIGHT } from "@/theme/constants";
import GameTypeNavPopupContent from "@/layouts/components/Header/components/GameTypeNavPopupContent";

const popupStyles = css`
  display: ${(props: { $isHovered: any }) => (props.$isHovered ? "block" : "none")};
  width: 100%;
  position: fixed;
  top: ${DESKTOP_HEADER_HEIGHT};
  left: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 5;
`;

export const PopupBg = styled.div`
  ${popupStyles}
`;

export const PopupBody = styled.div`
  ${popupStyles}

  width: 100%;
  min-width: 1000px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
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
      <PopupBody $isHovered={isHovered}>
        <GameTypeNavPopupContent />
      </PopupBody>
    </PopupBg>
  );
};

export default GameTypeNavPopup;
