import { useEffect, useRef } from "react";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { media } from "@/theme/breakpoints";
import playIcon from "@/assets/t17/images/home/play.png";

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
  height: 81%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 60%);
  border-radius: 15px;
  display: none;
  white-space: pre-line;
`;

const GameIcon = styled.div<{ $imageUrl: string }>`
  position: relative;
  width: 100%;
  padding-top: 80%;
  left: 0;
  top: 0;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-color: ${({ theme }) => theme.mainBackground};;

  ${media.sm} {
    padding-top: 62.96%;
    border-radius: 15px;
  }
`;

const GradientBg = styled.div`
  position: absolute;
  width: 100%;
  padding-top: 37.5%;
  left: 0;
  bottom: 0;
  background: ${({ theme }) => theme.picMask};

  ${media.sm} {
    bottom: 15%;
    padding-top: 42.2%;
  }
`;

const VendorCardContent = styled.div`
  width: 100%;
`;

const VendorCardBg = styled.div`
  width: calc(50% - 4px);
  position: relative;
  cursor: pointer;
  aspect-ratio: 200 / 160;

  ${media.sm} {
    width: calc(25% - 30px);
    min-width: 270px;
    aspect-ratio: 270 / 210;

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

const VenderNameMobile = styled(VendorCardContent)`
  position: absolute;
  bottom: 0;
  color: ${(props) => props.theme.white};
  font-size: 0.875rem;
  font-weight: 400;
  text-align: left;
  margin: 4px 0 12px 20px;
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
  bottom: -10px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  width: 100%;
  max-width: 150px;
  min-height: 44px;
  background-image: url(${({ $venderLogoUrl }) => $venderLogoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 60%);
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;

  ${media.sm} {
    height: 81%;
  }
`;

const Text = styled.div`
  color:#E0E0E0;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;

  ${media.sm} {
    font-size: 1.5625rem;
  }
`;

const PlayBtn = styled.img`
  width: 74px;
  height: 74px;
`;


const VendorCard = ({
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
        {isDesktopSize &&
          <GradientBg>
            {venderLogoUrl && <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>}
          </GradientBg>
        }
        {isMobileSize &&
          <GradientBg>
            {venderName && <VenderNameMobile ref={venderNameRef}>{venderName}</VenderNameMobile>}
          </GradientBg>
        }
        {isDesktopSize && venderName && <VenderName ref={venderNameRef}>{venderName}</VenderName>}
        {status === providerStatus.Maintenance && (
          <MaintenanceBg>
            <Text>UNDER MAINTENANCE</Text>
          </MaintenanceBg>
        )}
      </VendorCardContent>

      {isDesktopSize && (
        <VendorCardHoverBg onClick={launchGameHandler}>
          <PlayBtn src={playIcon} alt={"play"} />
        </VendorCardHoverBg>
      )}
    </VendorCardBg>
  );
};

export default VendorCard;
