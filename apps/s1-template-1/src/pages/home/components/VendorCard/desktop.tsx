import maintenanceIcon from "@/assets/t28/images/home/maintenance.svg";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { media } from "@/theme/breakpoints";
import { providerStatus } from "@tgs-web-nx/constants";
import { useEffect, useRef } from "react";
import styled from "styled-components";

import PlayIcon from "../PlayIcon";

type Props = {
  bgUrl: string;
  launchGame: () => void;
  status: number;
  imageUrl: string;
  gameName?: string;
  venderName?: string;
  venderLogoUrl?: string;
  name?: string;
};

const GameIcon = styled.div<{ $imageUrl: string }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  border-radius: 1.2rem;
`;

const VendorCardHoverBg = styled.div`
  flex-shrink: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 1.2rem;
  background: rgba(6, 0, 74, 0.8);
  backdrop-filter: blur(0.2rem);
  display: none;
  white-space: pre-line;
`;

const VendorCardBg = styled.div`
  width: 14rem;
  height: 100%;
  aspect-ratio: 140 / 189;
  position: relative;
  border-radius: 1.2rem;
  background: linear-gradient(149deg, #2e4667 2%, #2b486f 49.83%, #162c4a 97.67%);
  backdrop-filter: blur(2px);
  flex-shrink: 0;
  transition: transform 0.6s ease 0s;

  .game-icon {
    width: 100%;
    aspect-ratio: 140 / 189;
  }

  ${media.sm} {
    cursor: pointer;
    &:hover {
      ${VendorCardHoverBg} {
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 70%);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: not-allowed;
  }
`;

const MaintenanceIcon = styled.img`
  width: 185px;
  height: 130px;
`;

const HoverGameName = styled.div`
  position: absolute;
  top: 2rem;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.white};
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
`;

const DesktopVendorCard = ({ imageUrl, venderLogoUrl, launchGame, status, name }: Props) => {
  const venderNameRef = useRef<HTMLDivElement | null>(null);
  const { resizeText } = useDynamicFontSize();

  const launchGameHandler = () => {
    if (status === providerStatus.Maintenance) {
      return;
    }
    launchGame();
  };

  useEffect(() => {
    if (venderNameRef.current) {
      resizeText({ container: venderNameRef.current, text: venderNameRef.current });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venderNameRef.current]);

  return (
    <VendorCardBg onClick={launchGameHandler}>
      <img className="game-icon" src={imageUrl} title={name} alt={name} />
      {status === providerStatus.Maintenance && (
        <MaintenanceBg>
          <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
        </MaintenanceBg>
      )}

      <VendorCardHoverBg onClick={launchGameHandler}>
        {name && <HoverGameName>{name}</HoverGameName>}
        <PlayIcon />
      </VendorCardHoverBg>
    </VendorCardBg>
  );
};

export default DesktopVendorCard;
