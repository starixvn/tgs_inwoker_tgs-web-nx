import { useEffect, useRef } from "react";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import maintenanceIcon from "@/assets/t29/images/home/maintenance.svg";

type Props = {
  bgUrl: string;
  imageUrl: string;
  gameName?: string;
  launchGame: () => void;
  status: number;
};

const GameIcon = styled.div<{ $imageUrl: string }>`
  width: 100%;
  aspect-ratio: 200 /135;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const VendorCardBg = styled.div<{ $bgUrl: string }>`
  position: relative;
  width: 20%;
  max-width: 200px;
  aspect-ratio: 200/135;
  cursor: pointer;
  transition: transform 0.6s ease 0s;
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

const DesktopVendorCard = ({ bgUrl, imageUrl, launchGame, status }: Props) => {
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
  }, [venderNameRef.current]);

  return (
    <VendorCardBg $bgUrl={bgUrl} onClick={launchGameHandler}>
      <GameIcon $imageUrl={imageUrl} />
      {status === providerStatus.Maintenance && (
        <MaintenanceBg>
          <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
        </MaintenanceBg>
      )}
    </VendorCardBg>
  );
};

export default DesktopVendorCard;
