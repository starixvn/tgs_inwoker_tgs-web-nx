import styled from "styled-components";
import casinoIcon from "@/assets/t17/images/account/navItem/app-download.svg";

const SvgIconContainer = styled.div`
  width: 30px;
  height: 30px;
`;
const Download = ({ pathname, alt }: { pathname: string; alt?: string }) => {
  return (
    <SvgIconContainer>
      <img
        src={casinoIcon}
        alt={alt || ""}
        width={"100%"}
        height={"100%"}
      />
    </SvgIconContainer>
  );
};

export default Download;
