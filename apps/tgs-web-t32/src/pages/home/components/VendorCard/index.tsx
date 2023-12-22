import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import maintenanceIcon from "@/assets/t32/images/home/maintenance.svg";
import { media } from "@/theme/breakpoints";

type Props = {
  bgUrl: string;
  imageUrl: string;
  gameName?: string;
  vendorName: string;
  vendorLogoUrl: string;
  launchGame: () => void;
  status: number;
};

const GameIcon = styled.div<{ $imageUrl: string }>`
  position: absolute;
  top: -8%;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const VendorCardBg = styled.div<{ $bgUrl: string }>`
  position: relative;
  width: calc(50% - 10px);
  position: relative;
  aspect-ratio: 197 / 322;
  border-radius: 10px;
  background-image: url(${({ $bgUrl }) => $bgUrl});
  background-size: cover;

  ${media.sm} {
    width: calc(20% - 10px);
    aspect-ratio: 309 / 506;
  }
`;

const VendorNameInfo = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 14px 20px 20px 14px;
`;

const VendorName = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 1rem;
  font-weight: 700;
  text-align: flex-start;
  margin-bottom: 6px;
`;

const VendorLogo = styled.div<{ $vendorLogoUrl: string }>`
  width: 65%;
  height: 45%;
  background-image: url(${({ $vendorLogoUrl }) => $vendorLogoUrl});
  background-size: contain;
  background-repeat: no-repeat;
`;

const VendorPlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 60%);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: not-allowed;
  }
`;

const MaintenanceIcon = styled.img`
  width: 180px;
  height: 126px;
`;

const PlayBtn = styled.div`
  min-width: 108px;
  padding: 7px 12px;
  color: ${({ theme }) => theme.white};
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  background: ${({ theme }) => theme.btnPri};
  
  &:hover {
    box-shadow: 0 -5px 15px 0 #34c75cc9;
    padding: 10px 12px;
    }
`;

const VendorCard = ({
  bgUrl,
  imageUrl,
  vendorName,
  vendorLogoUrl,
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
      <VendorNameInfo>
        <VendorLogo $vendorLogoUrl={vendorLogoUrl}></VendorLogo>
        <VendorPlay>
          <VendorName>{vendorName}</VendorName>
          <PlayBtn>Play</PlayBtn>
        </VendorPlay>
      </VendorNameInfo>
      <GameIcon $imageUrl={imageUrl}></GameIcon>
      {status === providerStatus.Maintenance && (
        <MaintenanceBg>
          <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
        </MaintenanceBg>
      )}
    </VendorCardBg>
  );
};

export default VendorCard;
