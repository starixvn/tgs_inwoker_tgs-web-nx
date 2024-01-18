import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import TextButton from "../../../../pages/home/components/TextButton";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { media } from "@/theme/breakpoints";
import maintenanceIcon from "@/assets/t19/images/home/maintenance.svg";

type Props = {
  imageUrl: string;
  gameName?: string;
  venderName: string;
  launchGame: () => void;
  status: number;
};

// -------- hover effect for desktop--------------
const VendorCardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 81%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 60%);
  border-radius: 15px;
  display: none;
  white-space: pre-line;
`;

const GameIcon = styled.div<{ $imageUrl: string }>`
  position: relative;
  width: 100%;
  padding-top: 100%;
  left: 0;
  top: 0;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
`;

const VendorCardContent = styled.div`
  width: 100%;
`;

const VendorCardBg = styled.div<{ $isUM: boolean }>`
  width: calc(16.67% - 36px);
  min-width: 200px;
  aspect-ratio: 200 / 225;
  position: relative;
  cursor: pointer;

  ${({ $isUM }) =>
    !$isUM &&
    css`
      &:hover {
        background: linear-gradient(180deg, #f1cb4f, rgba(239, 208, 104, 0));
      }
    `}
`;

const VenderName = styled(VendorCardContent)`
  position: absolute;
  bottom: 0;
  color: ${(props) => props.theme.white};
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 89%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 50%);
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MaintenanceIcon = styled.img`
  width: 80%;
  height: 100%;
`;

const NavVendorCard = ({
  imageUrl,
  venderName,
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
  }

  useEffect(() => {
    if (venderNameRef.current) {
      resizeText({ container: venderNameRef.current, text: venderNameRef.current });
    }
  }, [resizeText, venderNameRef.current]);

  return (
    <VendorCardBg onClick={launchGameHandler} $isUM={status === providerStatus.Maintenance}>
      <VendorCardContent>
        <GameIcon $imageUrl={imageUrl}></GameIcon>
        {venderName && <VenderName ref={venderNameRef}>{venderName}</VenderName>}
        {status === providerStatus.Maintenance && (
          <MaintenanceBg>
            <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
          </MaintenanceBg>
        )}
      </VendorCardContent>
    </VendorCardBg>
  );
};

export default NavVendorCard;
