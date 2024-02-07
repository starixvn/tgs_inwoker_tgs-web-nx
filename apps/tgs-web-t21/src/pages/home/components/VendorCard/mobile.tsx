import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import { HTMLProps } from "react";
import { media } from "@/theme/breakpoints";
import maintenanceBG from "@/assets/t21/images/home/maintenanceBG.svg";
import maintenanceText from "@/assets/t21/images/home/maintenanceText.svg";

const MobileVendorCardContainer = styled.div`
  flex-shrink: 0;
  width: calc(50% - 6px);
  position: relative;

  background-size: cover;
  background-position: center;

  ${media.sm} {
    max-width: 186px;
  }
`;

const CardContainer = styled.div`
  position: relative;
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

const VendorCardImg = styled.div<{ $imageUrl: string }>`
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(1.67deg, #02a9dc 1.16%, rgba(2, 169, 220, 0) 75.02%);
`;

const MaintenanceBg = styled.div`
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  /* background: rgb(0 0 0 / 70%); */
  background-image: url(${maintenanceBG});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: not-allowed;
  }
`;

const VenderLogo = styled.div<{ $venderLogoUrl: string }>`
  z-index: 100;
  position: absolute;
  left: 15%;
  top: 60%;
  display: inline-flex;
  width: 100%;
  max-width: 100px;
  min-height: 41px;
  background-image: url(${({ $venderLogoUrl }) => $venderLogoUrl});
  background-size: contain;
  background-repeat: no-repeat;

  ${media.sm} {
    left: 25%;
    top: 70%;
  }
`;

const MaintenanceIcon = styled.img`
  width: 57px;
  height: 57px;
`;

const MaintenanceText = styled.img`
  width: 113px;
  height: 63px;
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
        <VendorCardBg $bgUrl={bgUrl} />
        <VendorCardImg $imageUrl={imageUrl} />
        {venderLogoUrl && <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>}
      </CardContainer>

      {status === providerStatus.Maintenance && (
        <MaintenanceBg>
          <MaintenanceText src={maintenanceText} alt={"maintenance"} />
        </MaintenanceBg>
      )}
      <GradientOverlay />
    </MobileVendorCardContainer>
  );
};

export default MobileVendorCard;
