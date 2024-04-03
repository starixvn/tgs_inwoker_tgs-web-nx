import { useEffect, useRef } from "react";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { media } from "@/theme/breakpoints";
import maintenanceIcon from "@/assets/t36/images/home/maintenance.svg";
import playIcon from "@/assets/t36/images/home/play-icon.png";
import gradientBg from "@/assets/t36/images/home/name-bg.png";

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
  height: 100%;
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

  ${media.sm} {
    height: 100%;
    aspect-ratio: 260 / 145;
    background-image: url(${({ $imageUrl }) => $imageUrl});
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 4px;
  }
`;

const GradientBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 4px;
`;

const GradientBgIcon = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const VenderNameShadowWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const VenderNameShadow = styled.div`
  background: #141b1fb2;
  width: 100%;
  height: 25px;
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
  aspect-ratio: 240 / 254;
  background-color: ${(props) => props.theme.g4};

  ${media.sm} {
    width: 260px;
    height: 145px;
    aspect-ratio: 260 / 145;

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
  padding-bottom: 5px;
  position: absolute;
  bottom: 0;
  color: ${(props) => props.theme.white};
  font-size: 15.6px;
  font-weight: 400;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.sm} {
    height: 25px;
    padding: 0;
  }
`;

const VenderLogo = styled.div<{ $venderLogoUrl: string }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  width: 100%;
  max-width: 131px;
  min-height: 60px;
  background-image: url(${({ $venderLogoUrl }) => $venderLogoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 10;
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
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
const VendorCard = ({ bgUrl, imageUrl, venderName, venderLogoUrl, launchGame, status }: Props) => {
  const { isDesktopSize, isMobileSize } = useRwd();
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
  }, [resizeText, venderNameRef.current]);

  return (
    <VendorCardBg onClick={launchGameHandler}>
      <VendorCardContent>
        <GameIcon $imageUrl={imageUrl}></GameIcon>
        {isMobileSize && (
          <>
            {venderLogoUrl && <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>}
            <GradientBg>
              <GradientBgIcon src={gradientBg} alt={"vendor name"} />
              {venderName && <VenderName ref={venderNameRef}>{venderName}</VenderName>}
            </GradientBg>
          </>
        )}
        {isDesktopSize && (
          <VenderNameShadowWrapper>
            <VenderNameShadow />
            {venderName && <VenderName ref={venderNameRef}>{venderName}</VenderName>}
          </VenderNameShadowWrapper>
        )}

        {status === providerStatus.Maintenance && (
          <MaintenanceBg>
            <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
          </MaintenanceBg>
        )}
      </VendorCardContent>
      {isDesktopSize && status !== providerStatus.Maintenance && (
        <VendorCardHoverBg onClick={launchGameHandler}>
          <PlayBtnIcon src={playIcon} alt={"play"} />
        </VendorCardHoverBg>
      )}
    </VendorCardBg>
  );
};

export default VendorCard;
