import { useEffect, useRef } from "react";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import TextButton from "../TextButton";
import picMask from "@/assets/t23/images/home/picMask.svg";
import { useRwd } from "@/core/hooks/tools/useRwd";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { media } from "@/theme/breakpoints";

type Props = {
  imageUrl: string;
  gameName?: string;
  venderName?: string;
  venderLogoUrl?: string;
  launchGame: () => void;
  status: number;
};

// -------- hover effect for desktop--------------
const VendorCardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 81%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 60%);
  border-radius: 15px;
  display: none;
  white-space: pre-line;
`;

const GameIcon = styled.div<{ $imageUrl: string }>`
  position: absolute;
  width: 100%;
  padding-top: 100%;
  left: 0;
  top: 0;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  border-radius: 5px;

  ${media.sm} {
    padding-top: 63.33%;
    border-radius: 15px;
  }
`;

const GradientBg = styled.div`
  position: absolute;
  width: 100%;
  padding-top: 100%;
  left: 0;
  top: 0;
  background-image: url(${picMask});
  background-size: cover;
  border-radius: 5px;

  ${media.sm} {
    padding-top: 63.33%;
    border-radius: 15px;
  }
`;

const VendorCardContent = styled.div`
  width: 100%;
`;

const VendorCardBg = styled.div`
  width: calc(33.33% - 5.8px);
  max-width: 110px;
  position: relative;
  cursor: pointer;
  aspect-ratio: 110 / 142;

  ${media.sm} {
    width: calc(25% - 30px);
    min-width: 270px;
    aspect-ratio: 270 / 211;

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
  position: absolute;
  bottom: 0;
  color: ${(props) => props.theme.white};
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
  margin: 4px 0 12px 0;
`;

const VenderLogo = styled.div<{ $venderLogoUrl: string }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  width: 100%;
  max-width: 80px;
  min-height: 30px;
  background-image: url(${({ $venderLogoUrl }) => $venderLogoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 77%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 50%);
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.sm} {
    height: 81%;
    border-radius: 15px;
  }
`;

const MaintenanceText = styled.div`
  color: ${(props) => props.theme.darkGray};
  font-size: 0.75rem;
  font-weight: 900;
  text-align: center;

  ${media.sm} {
    font-size: 1.5625rem;
    font-weight: 700;
  }
`;

const VendorCard = ({ imageUrl, venderName, venderLogoUrl, launchGame, status }: Props) => {
  const { isDesktopSize } = useRwd();
  const gameNameRef = useRef<HTMLDivElement | null>(null);
  const venderNameRef = useRef<HTMLDivElement | null>(null);
  const { resizeText } = useDynamicFontSize();

  useEffect(() => {
    if (gameNameRef.current) {
      resizeText({ container: gameNameRef.current, text: gameNameRef.current });
    }
    if (venderNameRef.current) {
      resizeText({ container: venderNameRef.current, text: venderNameRef.current });
    }
  }, [resizeText, gameNameRef.current, venderNameRef.current]);

  return (
    <VendorCardBg onClick={launchGame}>
      <VendorCardContent>
        <GameIcon $imageUrl={imageUrl}></GameIcon>
        <GradientBg>
          {venderLogoUrl && <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>}
        </GradientBg>
        {status === providerStatus.Maintenance && (
          <MaintenanceBg>
            <MaintenanceText>UNDER MAINTENANCE</MaintenanceText>
          </MaintenanceBg>
        )}
        {venderName && <VenderName ref={venderNameRef}>{venderName}</VenderName>}
      </VendorCardContent>

      {isDesktopSize && (
        <VendorCardHoverBg>
          <TextButton text={"Go"} onClick={launchGame} />
        </VendorCardHoverBg>
      )}
    </VendorCardBg>
  );
};

export default VendorCard;
