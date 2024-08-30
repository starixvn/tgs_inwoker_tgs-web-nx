import styled from "styled-components";

const SvgIconContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const SvgIcon = ({ pathname, alt }: { pathname: string; alt?: string }) => {
  return (
    <SvgIconContainer>
      <img
        // src={`${window.envConfig.assetsPath}assets/images/mobile/${pathname}`}
        src={pathname}
        alt={alt || ""}
        width={"100%"}
        height={"100%"}
      />
    </SvgIconContainer>
  );
};

export default SvgIcon;
