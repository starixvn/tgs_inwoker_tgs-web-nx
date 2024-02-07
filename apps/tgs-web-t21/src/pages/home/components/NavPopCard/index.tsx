import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { media } from "@/theme/breakpoints";
import maintenanceBG from "@/assets/t21/images/home/maintenanceBG.svg";
import maintenanceText from "@/assets/t21/images/home/maintenanceText.svg";

import playIcon from "@/assets/t21/images/home/play-green.svg";

type Props = {
  bgUrl: string;
  imageUrl: string;
  gameName?: string;
  venderName: string;
  venderLogoUrl: string;
  launchGame: () => void;
  status: number;
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const VendorCardBg = styled.div<{ $bgUrl: string }>`
  position: relative;
  width: 118px;
  height: 125px;
  position: relative;
  aspect-ratio: 118/125;
  cursor: pointer;
  transition: transform 0.6s ease 0s;
  background-image: url(${({ $bgUrl }) => $bgUrl});
  background-size: cover;
  display: flex;
  flex-direction: column;
`;

const VendorNameInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 25px;
  color: ${({ theme }) => theme.black};
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  margin-top: 10px;
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

const MaintenanceText = styled.img`
  width: 113px;
  height: 63px;
`;

const VenderLogo = styled.div<{ $venderLogoUrl: string }>`
  z-index: 2;
  position: absolute;
  left: 20%;
  top: 65%;
  display: inline-flex;
  width: 85px;
  height: 32px;
  background-color: ${({ theme }) => theme.gray10};
  background-image: url(${({ $venderLogoUrl }) => $venderLogoUrl});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const NavPopCard = ({ bgUrl, imageUrl, venderName, venderLogoUrl, launchGame, status }: Props) => {
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
    <MainWrapper>
      <VendorCardBg $bgUrl={imageUrl} onClick={launchGameHandler}></VendorCardBg>
      {venderLogoUrl && <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>}
      <VendorNameInfo ref={venderNameRef}>{venderName}</VendorNameInfo>
      {status === providerStatus.Maintenance && (
        <MaintenanceBg>
          <MaintenanceText src={maintenanceText} alt={"maintenance"} />
        </MaintenanceBg>
      )}
    </MainWrapper>
  );
};

export default NavPopCard;
