import { useEffect, useRef } from "react";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import TextButton from "../TextButton";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { media } from "@/theme/breakpoints";
import maintenanceIcon from "@/assets/t33/images/home/maintenance.svg";

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
  width: calc(100% - 20px);
  padding-top: 57.5%;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.45);

  ${media.sm} {
    padding-top: 63.33%;
    border-radius: 15px;
  }
`;

const VendorCardContentBg = styled.div`
  position: absolute;
  left: 0;
  bottom: 0.088px;
  width: 100%;
  height: 89%;
  border-radius: 2px;
  background:${(props) => props.theme.gray40};
`;

const VendorCardContent = styled.div`
  width: calc(100% - 20px);
`;

const VendorCardBg = styled.div`
  width: 50%;
  max-width: 200px;
  position: relative;
  cursor: pointer;
  aspect-ratio: 200 / 163;

  ${media.sm} {
    width: calc(33.33% - 13.33px);
    min-width: 380px;
    aspect-ratio: 380 / 310;

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

const VenderNameInfo = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  
  &::before {
    content: '';
    display: block;
    width: 5px;
    height: 29px;
    border-radius: 48px;
    background: ${(props) => props.theme.white};
    margin-right: 5px;
  }
`;

const VenderName = styled(VendorCardContent)`
  color: ${(props) => props.theme.white};
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
`;

const PlayBtn = styled.div`
  min-width: 64px;
  height: 36px;
  background: linear-gradient(180deg, #0587F5 0%, #0057A0 100%);
  border-radius: 30px;
  color: ${(props) => props.theme.mainBackground};
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: calc(100% - 20px);
  height:72%;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  background: rgb(0 0 0 / 50%);
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.sm} {
    height: 81%;
    border-radius: 15px;
  }
`;

const MaintenanceIcon = styled.img`
  width: 118px;
  height: 83px;
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
      <VendorCardContentBg />
      <VendorCardContent>
        <GameIcon $imageUrl={imageUrl}></GameIcon>
        <VenderNameInfo>
          <VenderName ref={venderNameRef}>{venderName}</VenderName>
          <PlayBtn>PLAY</PlayBtn>
        </VenderNameInfo>
        {status === providerStatus.Maintenance && (
          <MaintenanceBg>
            <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
          </MaintenanceBg>
        )}
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
