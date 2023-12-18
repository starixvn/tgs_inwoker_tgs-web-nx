import { useEffect, useRef } from "react";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import TextButton from "../TextButton";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { media } from "@/theme/breakpoints";
import maintenanceIcon from "@/assets/t30/images/home/maintenance.svg";

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
  width: 115px;
  height: 135px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  flex-shrink: 0;
`;

const VendorCardBg = styled.div<{ $bgUrl: string }>`
  position: relative;
  width: 20%;
  max-width: 200px;
  position: relative;
  aspect-ratio: 200/135;
  cursor: pointer;
  transition: transform 0.6s ease 0s;
`;

const VenderNameInfo = styled.div`
  width: calc(100% - 115px);
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

const VenderLogo = styled.div<{ $venderLogoUrl: string }>`
  display: inline-flex;
  width: 100%;
  max-width: 85px;
  min-height: 38px;
  background-image: url(${({ $venderLogoUrl }) => $venderLogoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
`;

const VenderName = styled(VenderNameInfo)`
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
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
    <VendorCardBg $bgUrl={bgUrl} onClick={launchGameHandler}>
      <GameIcon $imageUrl={imageUrl}></GameIcon>
      <VenderNameInfo>
        <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>
        <VenderName ref={venderNameRef}>{venderName}</VenderName>
      </VenderNameInfo>
      {status === providerStatus.Maintenance && (
        <MaintenanceBg>
          <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
        </MaintenanceBg>
      )}
    </VendorCardBg>
  );
};

export default DesktopVendorCard;
