import { useHomeGameContext } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import maintenanceIcon from "@/assets/t26/images/home/maintenance.svg";

const VendorName = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: center;
  color: ${({ theme }) => theme.text};
  white-space: normal;
`;

const Wrapper = styled.div<{
  $isActive: boolean;
}>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 84px;
  height: 84px;
  box-sizing: border-box;
  user-select: none;
  border-radius: 10px;
  background: ${({ theme, $isActive }) => ($isActive ? theme.primary : theme.darkGray)};
  position: relative;
  cursor: pointer;

  & > img {
    width: inherit;
  }
`;

const AllText = styled.div<{
  $isActive: boolean;
}>`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
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
  width: 62.96%;
  height: 100%;
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
  const { isDesktopSize } = useRwd();

  const getImgURL = () => {
    const prefix = import.meta.env.BASE_URL;
    const whiteIcon = `${prefix}assets/images/home/provider_logo/all/${gpCode}.png`;
    const colorIcon = `${prefix}assets/images/home/provider_logo/${activeGameTypeKey}/${gpCode}.png`;
    const res = isDesktopSize ? (isActive ? colorIcon : whiteIcon) : colorIcon;

    return res;
  };

  return (
    <Wrapper $isActive={isActive} onClick={onClick}>
      {text !== "All" && <img src={getImgURL()} alt={text} />}
      {text === "All" && <AllText $isActive={isActive}>All</AllText>}
      {text !== "All" && <VendorName>{text}</VendorName>}

      {status === providerStatus.Maintenance && (
        <MaintenanceBg>
          <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
        </MaintenanceBg>
      )}
    </Wrapper>
  );
};

export default ProviderTag;
