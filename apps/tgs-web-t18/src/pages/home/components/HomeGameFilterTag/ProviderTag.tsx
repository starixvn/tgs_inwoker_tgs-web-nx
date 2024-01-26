import { useHomeGameContext } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import maintenanceIcon from "@/assets/t18/images/home/maintenance.svg";

const ProviderTagContainer = styled.div<{
  $isActive: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: calc((100% - 10px * 2) / 3);

  box-sizing: border-box;
  user-select: none;
  background: #2c2c2c;
  border-bottom: 3px solid #ffffff1a;
  opacity: 0.8;
  padding: 15px 8px;
  position: relative;

  & > img {
    display: block;
    width: 100px;
    &:hover {
      cursor: pointer;
    }
  }
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
  width: 50%;
  height: 50%;
`;

type Props = {
  text: string;
  gpCode?: string;
  isActive: boolean;
  onClick: () => void;
  status: number;
};

const ProviderTag = ({ text, gpCode, isActive, onClick, status }: Props) => {
  const { activeGameTypeKey } = useHomeGameContext();

  if (text !== "All") {
    return (
      <ProviderTagContainer $isActive={isActive}>
        <img
          onClick={onClick}
          src={`${
            import.meta.env.BASE_URL
          }assets/images/home/provider_logo/${activeGameTypeKey}/${gpCode}.png`}
          alt={text}
        />
        {status === providerStatus.Maintenance && (
          <MaintenanceBg>
            <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
          </MaintenanceBg>
        )}
      </ProviderTagContainer>
    );
  }
};

export default ProviderTag;
