import { useEffect, useRef } from "react";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import maintenanceIcon from "@/assets/t26/images/home/maintenance.svg";

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
  gap: 10px;
`;

// -------- hover effect for desktop--------------
const VendorCardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 50%);
  border-radius: 4px;
  display: none;
  white-space: pre-line;
`;

const VendorCardBg = styled.div`
  width: 270px;
  height: 170px;
  position: relative;
  cursor: pointer;
  background-color: ${(props) => props.theme.g4};
  &:hover {
    ${VendorCardHoverBg} {
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const VendorCardContent = styled.div`
  width: 100%;
  height: 100%;
`;

const GameIcon = styled.div<{ $imageUrl: string }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
`;

const VenderLogo = styled.div<{ $venderLogoUrl: string }>`
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  width: 100%;
  max-width: 131px;
  min-height: 68px;
  background-image: url(${({ $venderLogoUrl }) => $venderLogoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const VenderName = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  /* text-align: left; */
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

const PlayButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 36px;
  padding: 10px 6px;
  border-radius: 20px;
  gap: 10px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.black};
  font-size: 15px;
  font-weight: 700;
  line-height: 15px;
  letter-spacing: 0em;
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
    <MainWrapper>
      <VendorCardBg>
        <VendorCardContent>
          <GameIcon $imageUrl={imageUrl}></GameIcon>
          {status === providerStatus.Maintenance && (
            <MaintenanceBg>
              <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
            </MaintenanceBg>
          )}
        </VendorCardContent>
        {
          <VendorCardHoverBg>
            <PlayButton onClick={launchGameHandler}>PLAY</PlayButton>
            {venderLogoUrl && <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>}
          </VendorCardHoverBg>
        }
      </VendorCardBg>
      <VenderName>{venderName}</VenderName>
    </MainWrapper>
  );
};

export default DesktopVendorCard;
