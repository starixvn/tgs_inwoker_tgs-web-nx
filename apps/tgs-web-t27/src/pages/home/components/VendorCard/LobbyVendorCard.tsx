import { useEffect, useRef } from "react";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import TextButton from "../TextButton";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { media } from "@/theme/breakpoints";
import maintenanceIcon from "@/assets/t27/images/home/maintenance.svg";
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
  height: 92%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 60%);
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
    width: calc(25% - 40px);
    min-width: 278px;
    aspect-ratio: 278 / 302;

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
  height: 74%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 50%);
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  ${media.sm} {
    height: 92%;
  }
`;

const MaintenanceIcon = styled.img`
  width: 90px;
  height: 63px;
`;

const PlayBtn = styled.div`
  min-width: 108px;
  padding: 8px 30px;
  color: ${(props) => props.theme.black};
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50px;
  background: var(--Gold-Gridient, linear-gradient(180deg, #EFD068 0%, #FEDFA1 28.13%, #D4B34F 65.1%, #B77E18 100%));
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);
  
  &:hover {
    box-shadow: 0 -5px 15px 0 rgba(236,166,61,.501);
    }
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
          <PlayBtn>Play</PlayBtn>
        </VendorCardHoverBg>
      )}
    </VendorCardBg>
  );
};

export default LobbyVendorCard;
