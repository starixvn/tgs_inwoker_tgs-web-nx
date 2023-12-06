import { useEffect, useRef } from "react";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import TextButton from "../TextButton";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { media } from "@/theme/breakpoints";
import maintenanceIcon from "@/assets/t29/images/home/maintenance.svg";

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
  right: 0;
  bottom: 0;
  width: 111px;
  height: 102px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
`;

const VendorCardBg = styled.div<{ $bgUrl: string }>`
  position: relative;
  width: calc(50% - 6px);
  //max-width: 161px;
  position: relative;
  aspect-ratio: 161 / 154;
  border-radius: 10px;
  background-image: url(${({ $bgUrl }) => $bgUrl});
  background-size: cover;
`;

const VenderNameInfo = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 14px 20px 20px 14px;
`;

const VenderName = styled.div`
  color: ${(props) => props.theme.text};
  font-size: 1rem;
  font-weight: 700;
  text-align: flex-start;
`;

const VenderLogo = styled.div<{ $venderLogoUrl: string }>`
  display: inline-flex;
  width: 100%;
  max-width: 58px;
  min-height: 29px;
  background-image: url(${({ $venderLogoUrl }) => $venderLogoUrl});
  background-size: contain;
  background-repeat: no-repeat;
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MaintenanceIcon = styled.img`
  width: 57px;
  height: 57px;
`;

const MobileVendorCard = ({
  bgUrl,
  imageUrl,
  venderName,
  venderLogoUrl,
  launchGame,
  status,
}: Props) => {
  return (
    <VendorCardBg $bgUrl={bgUrl} onClick={launchGame}>
      <VenderNameInfo>
        <VenderName>{venderName}</VenderName>
        <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>
      </VenderNameInfo>
      <GameIcon $imageUrl={imageUrl}></GameIcon>
      {status === providerStatus.Maintenance && (
        <MaintenanceBg>
          <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
        </MaintenanceBg>
      )}
    </VendorCardBg>
  );
};

export default MobileVendorCard;
