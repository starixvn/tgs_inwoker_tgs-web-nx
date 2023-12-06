import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { useGeneralStore } from "@tgs-web-nx/core";

type LoadingContainer = {
  $opacity: number;
  $open: boolean;
  $isMenuOpen?: boolean | undefined;
};
const LoadingContainer = styled.div<LoadingContainer>`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  transition:
    opacity 0.2s linear,
    height 0.02s linear 0.2s;
  background-color: rgba(0, 0, 0, ${({ $opacity }: LoadingContainer) => $opacity});
  ${({ $open }) => ($open ? "opacity:1;height: 100%;" : "opacity:0;height:0px;")};
  z-index: 9999;
`;
const Inner = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LogoImg = styled.img`
  margin: 0 auto;
  display: block;
  width: 250px;
`;
type Props = {
  show: boolean;
  opacity?: number;
  noShrink?: boolean;
};

const Loading = ({ show, opacity, noShrink }: Props) => {
  const { general } = useGeneralStore();
  const backgroundOpacity = typeof opacity === "number" ? opacity : 0.5;

  return (
    <LoadingContainer $open={show} $opacity={backgroundOpacity} $isMenuOpen={false}>
      <Inner>
        <LogoImg src={general.brand && general.brand.loadingUrl} />
        <div className="clear" />
        <CircularProgress size={80} color={"primary"} style={{ margin: "30px 0 0 80px" }} />
      </Inner>
    </LoadingContainer>
  );
};

export default Loading;
