import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { media } from "@/theme/breakpoints";
import maintenanceIcon from "@/assets/t34/images/home/maintenance.svg";
import playIcon from "@/assets/t34/images/home/play-green.svg";

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
const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 60%);
  display: none;
  white-space: pre-line;
`;

const VendorCardBg = styled.div<{ $bgUrl: string }>`
  position: relative;
  width: 20%;
  max-width: 200px;
  position: relative;
  aspect-ratio: 228/366;
  cursor: pointer;
  transition: transform 0.6s ease 0s;
  background-image: url(${({ $bgUrl }) => $bgUrl});
  background-size: cover;
  display: flex;
  flex-direction: column;

  ${media.sm} {
    &:hover {
      ${CardHoverBg} {
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

const VendorNameInfo = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  width: 100%;
  height: 25px;
  text-align: center;
  background: #141b1fb2;
  color: ${({ theme }) => theme.white};
  font-size: 13px;
  font-weight: 400;
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
  width: 57px;
  height: 57px;
`;

const PlayIcon = styled.img`
  width: 45px;
  height: 45px;
`;

const DesktopVendorCard = ({
  bgUrl,
  imageUrl,
  venderName,
  venderLogoUrl,
  launchGame,
  status,
}: Props) => {
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
  }, [venderNameRef.current]);

  return (
    <VendorCardBg $bgUrl={imageUrl} onClick={launchGameHandler}>
      <VendorNameInfo ref={venderNameRef}>{venderName}</VendorNameInfo>

      <CardHoverBg onClick={launchGameHandler}>
        <PlayIcon src={playIcon} alt={"play"} />
      </CardHoverBg>

      {status === providerStatus.Maintenance && (
        <MaintenanceBg>
          <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
        </MaintenanceBg>
      )}
    </VendorCardBg>
  );
};

export default DesktopVendorCard;
