import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import { HTMLProps } from "react";
import { media } from "@/theme/breakpoints";
import maintenanceIcon from "@/assets/t21/images/home/maintenance.svg";

const MobileVendorCardContainer = styled.div`
  width: 100%;

  ${media.sm} {
    width: calc(33.33% - 10px);
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.black02};
  border-radius: 4px;
`;

const VendorCardBg = styled.div<{ $bgUrl: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: 380/168;
  background-image: url(${({ $bgUrl }) => $bgUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 4px;
`;

const VendorCardImg = styled.div<{ $imageUrl: string }>`
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  width: 200px;
  height: 100%;
  left: 40%;
  top: 0%;
`;
const VendorName = styled.div`
  font-size: 15px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.primary};
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 70%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 11px;

  &:hover {
    cursor: not-allowed;
  }
`;

const VenderLogo = styled.div<{ $venderLogoUrl: string }>`
  width: 100%;
  height: 50px;
  background-image: url(${({ $venderLogoUrl }) => $venderLogoUrl});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const FixedBlock = styled.div`
  position: absolute;
  height: 100%;
  width: 50%;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`;

const PlayIcon = styled.div`
  display: flex;
  width: 102px;
  height: 32px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  cursor: pointer;
`;

const MaintenanceIcon = styled.img`
  width: 57px;
  height: 57px;
`;

type Props = {
  bgUrl: string;
  imageUrl: string;
  gameName?: string;
  venderName: string;
  venderLogoUrl: string;
  launchGame: () => void;
  status: number;
} & HTMLProps<HTMLDivElement>;

const SportsCard = ({
  bgUrl,
  imageUrl,
  venderName,
  venderLogoUrl,
  launchGame,
  status,
  ...others
}: Props) => {
  const launchGameHandler = () => {
    if (status === providerStatus.Maintenance) {
      return;
    }
    launchGame();
  };

  return (
    // @ts-ignore
    <MobileVendorCardContainer {...others}>
      <CardContainer>
        <VendorCardBg $bgUrl={bgUrl} />
        <VendorCardImg $imageUrl={imageUrl} />
        <FixedBlock>
          {venderLogoUrl && <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>}
          <VendorName>{venderName}</VendorName>
          <PlayIcon onClick={launchGameHandler}>Play</PlayIcon>
        </FixedBlock>
      </CardContainer>
      {/* 目前MT就隱藏不顯示 */}
      {/* {status === providerStatus.Maintenance && (
        <MaintenanceBg>
          <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
        </MaintenanceBg>
      )} */}
    </MobileVendorCardContainer>
  );
};

export default SportsCard;
