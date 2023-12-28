import { useEffect, useRef } from "react";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import TextButton from "../TextButton";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { media } from "@/theme/breakpoints";
import maintenanceIcon from "@/assets/t31/images/home/maintenance.svg";

type Props = {
  bgUrl: string;
  imageUrl: string;
  gameName?: string;
  venderName: string;
  venderLogoUrl: string;
  launchGame: () => void;
  status: number;
};

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
  padding-top: 100%;
  left: 0;
  top: 0;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.black};

  ${media.sm} {
    padding-top: 62.96%;
  }
`;

const GradientBg = styled.div`
  position: absolute;
  width: 100%;
  padding-top: 100%;
  left: 0;
  top: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 29.17%, #181d30 100%);
  border-radius: 15px;

  ${media.sm} {
    padding-top: 80.95%;
  }
`;

const VendorCardContent = styled.div`
  width: 100%;
`;

const VendorCardBg = styled.div`
  width: calc(33.33% - 8px);
  position: relative;
  cursor: pointer;
  aspect-ratio: 150 / 127;

  ${media.sm} {
    width: calc(25% - 40px);
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
  height: 74%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 50%);
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;

  ${media.sm} {
    height: 81%;
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
  background: var(
    --Gold-Gridient,
    linear-gradient(180deg, #efd068 0%, #fedfa1 28.13%, #d4b34f 65.1%, #b77e18 100%)
  );
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);

  &:hover {
    box-shadow: 0 -5px 15px 0 rgba(236, 166, 61, 0.501);
  }
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
          <GradientBg>
            {venderLogoUrl && <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>}
          </GradientBg>
        )}
        {/* {venderName && <VenderName ref={venderNameRef}>{venderName}</VenderName>} */}
        {status === providerStatus.Maintenance && (
          <MaintenanceBg>
            <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
          </MaintenanceBg>
        )}
      </VendorCardContent>
    </VendorCardBg>
  );
};

export default VendorCard;
