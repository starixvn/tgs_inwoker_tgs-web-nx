import maintenanceIcon from "@/assets/t28/images/home/maintenance.svg";
import playIcon from "@/assets/t28/images/home/play.svg";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { media } from "@/theme/breakpoints";
import { providerStatus } from "@tgs-web-nx/constants";
import { useEffect, useRef } from "react";
import styled from "styled-components";

type Props = {
  bgUrl: string;
  imageUrl: string;
  gameName?: string;
  venderName: string;
  venderLogoUrl: string;
  launchGame: () => void;
  status: number;
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
  backdrop-filter: blur(3px);
  border-radius: 10px;
  display: none;
  white-space: pre-line;
`;

const VendorCardBg = styled.div`
  min-width: 121px;
  width: calc(33.33% - 8px);
  height: 100%;
  aspect-ratio: 140 / 189;
  position: relative;
  flex-shrink: 0;
  transition: transform 0.6s ease 0s;

  ${media.sm} {
    width: 248px;
    height: 315px;
    aspect-ratio: 248 / 315;
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

const VenderLogo = styled.div<{ $venderLogoUrl: string }>`
  z-index: 100;
  position: absolute;
  left: 50%;
  top: 70%;
  display: inline-flex;
  width: 100%;
  max-width: 8.5rem;
  min-height: 3rem;
  background-image: url(${({ $venderLogoUrl }) => $venderLogoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(-50%, -50%);
  ${media.sm} {
    left: 40%;
    top: 85%;
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

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(180deg, rgba(244, 47, 47, 0) 0%, rgba(244, 47, 47, 1) 80.21%);
  border-radius: 0 0 1.2rem 1.2rem;
`;

const PlayIcon = styled.img`
  width: 60px;
  height: 60px;
`;

const DesktopVendorCard = ({ imageUrl, venderLogoUrl, launchGame, status }: Props) => {
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
      <GameIcon $imageUrl={imageUrl}></GameIcon>

      <GradientOverlay>
        {venderLogoUrl && <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>}
        {status === providerStatus.Maintenance && (
          <MaintenanceBg>
            <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
          </MaintenanceBg>
        )}
      </GradientOverlay>
      <VendorCardHoverBg onClick={launchGameHandler}>
        <PlayIcon src={playIcon} alt={"play"} />
      </VendorCardHoverBg>
    </VendorCardBg>
  );
};

export default DesktopVendorCard;
