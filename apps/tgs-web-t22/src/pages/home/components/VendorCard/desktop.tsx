import { useEffect, useRef } from "react";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import maintenanceIcon from "@/assets/t22/images/home/maintenance.png";

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

const Name = styled.p`
  margin-top: 10px;
  text-align: center;
  font-size: .8rem;
  color: ${({theme}) => theme.white};
`;

const CardImage = styled.div`
  position: relative;
  border-radius: 16px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  aspect-ratio: 270 / 170;
`;

const Card = styled.div<{ 
  $imageUrl: string
}>`
  width: 100%;
  cursor: pointer;

  ${CardImage} {
    background-image: url(${({ $imageUrl }) => $imageUrl});
  }
`;

type Props = {
  imageUrl: string;
  venderName: string;
  launchGame: () => void;
  status: number;
};

const DesktopVendorCard = ({ imageUrl, venderName, launchGame, status }: Props) => {
  const venderNameRef = useRef<HTMLDivElement | null>(null);
  const { resizeText } = useDynamicFontSize();
  const isMaintain = status === providerStatus.Maintenance;

  const launchGameHandler = () => {
    if (!isMaintain) {
      launchGame();
    }
  }; 

  useEffect(() => {
    if (venderNameRef.current) {
      resizeText({ container: venderNameRef.current, text: venderNameRef.current });
    }
  }, [venderNameRef.current]);

  return (
    <Card $imageUrl={imageUrl} onClick={launchGameHandler}>
      <CardImage >
        {isMaintain && (
          <MaintenanceBg>
            <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
          </MaintenanceBg>
        )}
      </CardImage>
      <Name>{venderName}</Name>
    </Card>
  );
};

export default DesktopVendorCard;
