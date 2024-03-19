import { useHomeGameContext } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import { providerStatus } from "@tgs-web-nx/constants";
import maintenanceIcon from "@/assets/t19/images/home/maintenance.svg";

const VendorName = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
  margin: 4.5px;
  height: 16px;
  line-height: 16px;
  color: rgba(173, 173, 173, 0.67);
`;

const Wrapper = styled.div<{
  $isActive: boolean;
  $hoverImage?: string;
}>`
  vertical-align: middle;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 156px;
  height: 100px;
  box-sizing: border-box;
  user-select: none;
  border-radius: 10px;
  background: ${({ theme, $isActive }) => ($isActive ? theme.goldGradient : "none")};
  position: relative;
  margin-bottom: 10px;
  margin-right: 4px;
  cursor: pointer;

  & > img {
    width: 117px;
    height: 58px;
  }

  &:hover {
    background: ${({ theme }) => theme.goldGradient};
    border-bottom: 2px solid ${({ theme }) => theme.primary};

    img {
      content: url(${props => props.$hoverImage || ""});
    }

    ${VendorName} {
      color: ${({ theme }) => theme.black};
    }
  }
`;

const AllText = styled.div<{
  $isActive: boolean;
}>`
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme, $isActive }) => ($isActive ? theme.black : theme.white)};

  &:hover {
    color: ${({ theme }) => theme.white};
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
  const hoverImage = `/assets/images/home/hover_provider_logo/${activeGameTypeKey}/${gpCode}.png`;

  return (
    <Wrapper $isActive={isActive} $hoverImage={hoverImage}>
      {text !== "All" && <img
        onClick={onClick}
        src={`${import.meta.env.BASE_URL
          }assets/images/home/provider_logo/${activeGameTypeKey}/${gpCode}.png`}
        alt={text}
      />}
      {text == "All" && <AllText $isActive={isActive} onClick={onClick}>All</AllText>}
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
