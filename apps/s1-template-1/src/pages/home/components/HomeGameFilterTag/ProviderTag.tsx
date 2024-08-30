import { useHomeGameContext } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import { utility } from "@tgs-web-nx/utils";
import maintenanceIcon from "@/assets/t28/images/home/maintenance.svg";

const Wrapper = styled.div<{
  $isActive: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  max-width: none;
  box-sizing: border-box;
  user-select: none;
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.white : "none")};
  padding: 4px;
  border-bottom: ${({ theme, $isActive }) => ($isActive ? `3px solid ${theme.blue60}` : "none")};
  position: relative;

  & > img {
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
      <Wrapper $isActive={isActive}>
        <img
          onClick={onClick}
          src={`${utility.imagePathGenerator(
            `home/provider_logo/${activeGameTypeKey}/${gpCode}.png`,
          )}`}
          alt={text}
        />
        {status === providerStatus.Maintenance && (
          <MaintenanceBg>
            <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
          </MaintenanceBg>
        )}
      </Wrapper>
    );
  }
};

export default ProviderTag;
