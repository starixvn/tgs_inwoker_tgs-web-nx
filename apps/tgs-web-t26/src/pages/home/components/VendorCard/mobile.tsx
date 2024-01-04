import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
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
  width: 68.9%; //111:161
  height: 66.2%; //102:154
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
`;

const VendorCardBg = styled.div<{ $bgUrl: string }>`
  position: relative;
  width: calc(50% - 6px);
  position: relative;
  aspect-ratio: 161 / 154;
  border-radius: 10px;
  background-image: url(${({ $bgUrl }) => $bgUrl});
  background-size: cover;
`;

const VenderNameInfo = styled.div`
  width: 100%;
  height: 100%;
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
  width: 46%;
  height: 25%;
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
  venderName,
  venderLogoUrl,
  launchGame,
  status,
}: Props) => {
  const launchGameHandler = () => {
    if (status === providerStatus.Maintenance) {
      return;
    }
    launchGame();
  };

  return (
    <VendorCardBg $bgUrl={bgUrl} onClick={launchGameHandler}>
      {/* <VenderNameInfo>
        <VenderName>{venderName}</VenderName>
        <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>
      </VenderNameInfo>
      <GameIcon $imageUrl={imageUrl}></GameIcon>
      {status === providerStatus.Maintenance && (
        <MaintenanceBg>
          <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
        </MaintenanceBg>
      )} */}
    </VendorCardBg>
  );
};

export default MobileVendorCard;
