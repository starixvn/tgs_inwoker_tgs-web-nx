import { DESKTOP_DRAWER_WIDTH } from "@/theme/constants";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";

type LoadingContainer = {
  $opacity: number;
  $open: boolean;
  $isMenuOpen?: boolean | undefined;
};
const LoadingContainer = styled.div<LoadingContainer>`
  width: ${({ $isMenuOpen }: LoadingContainer) =>
    $isMenuOpen ? `calc(100% - ${DESKTOP_DRAWER_WIDTH})` : "100%"};
  top: 0;
  left: ${({ $isMenuOpen }: LoadingContainer) => ($isMenuOpen ? DESKTOP_DRAWER_WIDTH : 0)};
  position: fixed;
  transition:
    opacity 0.2s linear,
    height 0.02s linear 0.2s;
  background-color: rgba(0, 0, 0, ${({ $opacity }: LoadingContainer) => $opacity});
  ${({ $open }) => ($open ? "opacity:1;height: 100%;" : "display: none")};
  z-index: 9999;
`;
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  const backgroundOpacity = typeof opacity === "number" ? opacity : 0.5;

  return (
    <LoadingContainer $open={show} $opacity={backgroundOpacity} $isMenuOpen={false}>
      <Inner>
        <CircularProgress size={80} color={"secondary"} style={{ margin: "6rem 0 0 0" }} />
      </Inner>
    </LoadingContainer>
  );
};

export default Loading;
