import { useEffect, useRef } from "react";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import TextButton from "../TextButton";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { media } from "@/theme/breakpoints";
import maintenanceIcon from "@/assets/t27/images/home/maintenance.svg";
import playIcon from "@/assets/t27/images/home/play-icon.png";
import gradientBg from "@/assets/t27/images/home/name-bg.png";

type Props = {
  bgUrl: string;
  imageUrl: string;
  gameName?: string;
  venderName: string;
  venderLogoUrl: string;
  launchGame: () => void;
  status: number;
};

// -------- hover effect for desktop--------------
const VendorCardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 84%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 50%);
  border-radius: 4px;
  display: none;
  white-space: pre-line;
`;

const GameIcon = styled.div<{ $imageUrl: string }>`
  position: relative;
  width: 100%;
  padding-top: 106%;
  left: 0;
  top: 0;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  border-radius: 4px;
`;

const GradientBg = styled.div`
  position: absolute;
  width: 100%;
  height: 84%; //212/254
  left: 0;
  top: 0;
  border-radius: 4px;
`;

const GradientBgIcon = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const VendorCardContent = styled.div`
  width: 100%;
`;

const VendorCardBg = styled.div`
  width: calc(50% - 5px);
  position: relative;
  cursor: pointer;
  aspect-ratio: 198 / 254;
  background-color: ${(props) => props.theme.g4};

  ${media.sm} {
    width: calc(14.28% - 10px);
    min-width: 196px;
    aspect-ratio: 196 / 254;

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

const VenderName = styled(VendorCardContent)`
  width: 100%;
  padding: 12px;
  position: absolute;
  bottom: 0;
  color: ${(props) => props.theme.white};
  font-size: 15.6px;
  font-weight: 400;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const VenderLogo = styled.div<{ $venderLogoUrl: string }>`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  width: 100%;
  max-width: 131px;
  min-height: 68px;
  background-image: url(${({ $venderLogoUrl }) => $venderLogoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 84%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 80%);
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const PlayBtnIcon = styled.img`
  width: 45px;
  height: 45px;
`;

const MaintenanceIcon = styled.img`
  width: 140px;
  height: 90px;
`;

const LobbyVendorCard = ({
  bgUrl,
  imageUrl,
  venderName,
  venderLogoUrl,
  launchGame,
  status,
}: Props) => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const venderNameRef = useRef<HTMLDivElement | null>(null);
  const { resizeText } = useDynamicFontSize();

  const launchGameHandler = () => {
    if (status === providerStatus.Maintenance) {
      return;
    }
    launchGame();
  }

  useEffect(() => {
    if (venderNameRef.current) {
      resizeText({ container: venderNameRef.current, text: venderNameRef.current });
    }
  }, [resizeText, venderNameRef.current]);

  return (
    <VendorCardBg onClick={launchGameHandler}>
      <VendorCardContent>
        <GameIcon $imageUrl={imageUrl}></GameIcon>
        <GradientBg>
          <GradientBgIcon src={gradientBg} alt={"vendor name"} />
          {venderLogoUrl && <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>}
        </GradientBg>
        {venderName && <VenderName ref={venderNameRef}>{venderName}</VenderName>}
        {status === providerStatus.Maintenance && (
          <MaintenanceBg>
            <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
          </MaintenanceBg>
        )}
      </VendorCardContent>
      {isDesktopSize && (
        <VendorCardHoverBg onClick={launchGameHandler}>
          <PlayBtnIcon src={playIcon} alt={"play"} />
        </VendorCardHoverBg>
      )}
    </VendorCardBg>
  );
};

export default LobbyVendorCard;
