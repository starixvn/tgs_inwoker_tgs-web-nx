import { useHomeGameContext } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import maintenanceIcon from "@/assets/t21/images/home/maintenance.svg";
import { media } from "@/theme/breakpoints";

const ProviderTagContainer = styled.div<{
  $isActive: boolean;
}>`
  height: 29px;
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  padding: 14px;
  background: ${({ theme, $isActive }) => ($isActive ? theme.focus : theme.primary)};
  color: ${({ theme, $isActive }) => ($isActive ? theme.yellow : theme.white)};

  ${media.sm} {
    width: 122px;
    height: 37px;
    padding: 10px 4px;
    gap: 2px;
    background: ${({ theme, $isActive }) => ($isActive ? theme.primary : "transparent")};
    color: ${({ theme, $isActive }) => ($isActive ? theme.white : theme.gray50)};
    border: ${({ theme, $isActive }) => ($isActive ? "none" : `1px solid ${theme.gray20}`)};
    cursor: pointer;
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

const Text = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0em;
`;

type Props = {
  text: string;
  gpCode?: string;
  isActive: boolean;
  onClick: () => void;
  status: number;
};

const ProviderTag = ({ text, gpCode, isActive, onClick, status }: Props) => {
  return (
    <ProviderTagContainer $isActive={isActive} onClick={onClick}>
      <Text>{text}</Text>

      {status === providerStatus.Maintenance && (
        <MaintenanceBg>
          <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
        </MaintenanceBg>
      )}
    </ProviderTagContainer>
  );
};

export default ProviderTag;
