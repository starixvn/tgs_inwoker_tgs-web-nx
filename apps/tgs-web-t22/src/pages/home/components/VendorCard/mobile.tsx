import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import maintenanceIcon from "@/assets/t22/images/home/maintenance.png";

type Props = {
  imageUrl: string;
  gameName?: string;
  launchGame: () => void;
  status: number;
};


const Card = styled.div<{ $bgUrl: string }>`
  position: relative;
  width: 100%;
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
  width: 120px;
`;

const MobileVendorCard = ({
  imageUrl,
  launchGame,
  gameName,
  status,
}: Props) => {
  const isMaintain = status === providerStatus.Maintenance;
  const launchGameHandler = () => {
    if (!isMaintain) {
      launchGame();
    }
  };

  return (
    <Card $bgUrl={imageUrl} onClick={launchGameHandler}>
      {isMaintain && (
        <MaintenanceBg>
          <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
        </MaintenanceBg>
      )}
    </Card>
  );
};

export default MobileVendorCard;
