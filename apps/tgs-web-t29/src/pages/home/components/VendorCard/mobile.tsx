import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
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
  height: 100%;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const VendorCardBg = styled.div<{ $bgUrl: string }>`
  position: relative;
  width: calc(50% - 6px);
  aspect-ratio: 161 / 154;
  border-radius: 10px;
  background-image: url(${({ $bgUrl }) => $bgUrl});
  background-size: cover;
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

const MobileVendorCard = ({
  bgUrl,
  imageUrl,
  launchGame,
  status,
}: Props) => {

  const launchGameHandler = () => {
    if (status === providerStatus.Maintenance) {
      return;
    }
    launchGame();
  }

  return (
    <VendorCardBg $bgUrl={bgUrl} onClick={launchGameHandler}>
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
