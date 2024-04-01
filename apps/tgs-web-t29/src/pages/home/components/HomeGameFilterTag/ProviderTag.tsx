import { useHomeGameContext } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import maintenanceIcon from "@/assets/t29/images/home/maintenance.svg";
import { media } from "@/theme/breakpoints";

const Wrapper = styled.div<{
  $isActive: boolean;
  $bgUrl: string;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 140px;
  min-height: 135px;
  box-sizing: border-box;
  user-select: none;
  position: relative;
  background-image: url(${({ $bgUrl }) => $bgUrl});
  border-radius: 10px;
  & > img {
    width: 100px;
    min-height: 50px;
    &:hover {
      cursor: pointer;
    }
  }
  ${media.sm} {
    background-image: unset;
    min-width: 60px;
    max-width: none;
    min-height: unset;
    position: relative;
    padding: 4px;
    background-color: ${({ theme, $isActive }) => ($isActive ? theme.white : "none")};
    border-bottom: ${({ theme, $isActive }) => ($isActive ? `3px solid ${theme.blue60}` : "none")};
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

  if (text !== "All" && text !== "FUNKY") {
    return (
      <Wrapper $isActive={isActive} $bgUrl={`/assets/images/home/mobile/mbg.png`}>
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
      </Wrapper>
    );
  }
};

export default ProviderTag;
