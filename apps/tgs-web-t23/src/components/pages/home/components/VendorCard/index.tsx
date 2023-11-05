import picMask from "@/assets/t23/images/home/picMask.svg";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { providerStatus } from "@/core/constants/games";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { media } from "@/theme/breakpoints";
import { useEffect, useRef } from "react";
import styled from "styled-components";

type Props = {
  imageUrl: string;
  gameName?: string;
  venderName?: string;
  venderLogoUrl?: string;
  launchGame: () => void;
  status: number;
  lobbyVenderName?: string;
};

// -------- hover effect for desktop--------------
const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 80%);
  border-radius: 10px;
  padding: 0 5px;
  display: none;
  white-space: pre-line;
  display: flex;
  justify-content: flex-end;
`;

const GameIcon = styled.div<{ $imageUrl: string }>`
  position: absolute;
  width: 100%;
  padding-top: 100%;
  left: 0;
  top: 0;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  border-radius: 5px;
`;

const GradientBg = styled.div`
  position: absolute;
  width: 100%;
  padding-top: 100%;
  left: 0;
  top: 0;
  background-image: url(${picMask});
  background-size: cover;
  border-radius: 0 0 5px 5px;
`;

const VendorCardContent = styled.div`
  width: 100%;
`;

const HoverVenderName = styled(VendorCardContent)`
  color: ${(props) => props.theme.white};
  font-size: 1rem;
  text-align: center;
  margin-bottom: 16px;
`;

const PlayIcon = styled.img`
  width: 65px;
  height: 65px;
`;

const VendorCardBg = styled.div`
  width: calc(33.33% - 5.8px);
  position: relative;
  cursor: pointer;
  aspect-ratio: 110 / 142;

  ${media.sm} {
    width: calc(16.67% - 24.4px);
    min-width: 110px;

    &:hover {
      ${CardHoverBg} {
        z-index: 1;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

const GameName = styled(VendorCardContent)`
  color: ${(props) => props.theme.white};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 1rem;
  font-weight: 900;
  margin-bottom: 4px;
  text-align: center;
`;

const VenderName = styled(VendorCardContent)`
  position: absolute;
  bottom: 0;
  color: ${(props) => props.theme.white};
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
  margin: 4px 0 12px 0;
`;

const VenderLogo = styled.div<{ $venderLogoUrl: string }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  width: 100%;
  max-width: 80px;
  min-height: 30px;
  background-image: url(${({ $venderLogoUrl }) => $venderLogoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 77%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 50%);
  padding: 7px;
  display: flex;
  align-items: center;
`;

const MaintenanceText = styled.div`
  color: ${(props) => props.theme.darkGray};
  font-size: 0.75rem;
  font-weight: 900;
  text-align: center;
`;

const VendorCard = ({
  imageUrl,
  gameName,
  venderName,
  venderLogoUrl,
  launchGame,
  status,
  lobbyVenderName,
}: Props) => {
  const { isDesktopSize } = useRwd();
  const gameNameRef = useRef<HTMLDivElement | null>(null);
  const venderNameRef = useRef<HTMLDivElement | null>(null);
  const lobbyVenderNameRef = useRef<HTMLDivElement | null>(null);
  const { resizeText } = useDynamicFontSize();

  useEffect(() => {
    if (gameNameRef.current) {
      resizeText({ container: gameNameRef.current, text: gameNameRef.current });
    }
    if (venderNameRef.current) {
      resizeText({ container: venderNameRef.current, text: venderNameRef.current });
    }
    if (lobbyVenderNameRef.current) {
      resizeText({ container: lobbyVenderNameRef.current, text: lobbyVenderNameRef.current });
    }
  }, [resizeText, gameNameRef.current, venderNameRef.current, lobbyVenderNameRef.current]);

  return (
    <VendorCardBg onClick={launchGame}>
      <VendorCardContent>
        <GameIcon $imageUrl={imageUrl}></GameIcon>
        <GradientBg>
          {venderLogoUrl && (
            <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>
          )}
        </GradientBg>
        {status === providerStatus.Maintenance && (
          <MaintenanceBg>
            <MaintenanceText>UNDER MAINTENANCE</MaintenanceText>
          </MaintenanceBg>
        )}

        {lobbyVenderName && <VenderName ref={venderNameRef}>{lobbyVenderName}</VenderName>}
      </VendorCardContent>

      {isDesktopSize && <CardHoverBg>
        {gameName && <HoverVenderName ref={lobbyVenderNameRef}>{gameName}</HoverVenderName>}
        {lobbyVenderName && (
          <HoverVenderName ref={lobbyVenderNameRef}>{lobbyVenderName}</HoverVenderName>
        )}
      </CardHoverBg>}
    </VendorCardBg>
  );
};

export default VendorCard;
