import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import { HTMLProps } from "react";
import { media } from "@/theme/breakpoints";
import maintenanceIcon from "@/assets/t21/images/home/maintenance.svg";

const MobileVendorCardContainer = styled.div`
  width: calc(50% - 6px);
  position: relative;

  background-size: cover;
  background-position: center;

  ${media.sm} {
    width: calc(16.67% - 6px);

`;

const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: ${({ theme }) => theme.black02};
  border-radius: 4px;
`;

const VendorCardBg = styled.div<{ $bgUrl: string }>`
  position: relative;
  width: 100%;
  position: relative;
  aspect-ratio: 128/128;
  background-image: url(${({ $bgUrl }) => $bgUrl});
  background-size: cover;
  border-radius: 4px;
`;

const VendorName = styled.div`
  font-size: 0.875rem;
  padding: 8px;
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

const MobileVendorCard = ({
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
      <CardContainer onClick={launchGameHandler}>
        <VendorCardBg $bgUrl={imageUrl} />
        <VendorName>{venderName}</VendorName>
      </CardContainer>

      {status === providerStatus.Maintenance && (
        <MaintenanceBg>
          <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
        </MaintenanceBg>
      )}
    </MobileVendorCardContainer>
  );
};

export default MobileVendorCard;
