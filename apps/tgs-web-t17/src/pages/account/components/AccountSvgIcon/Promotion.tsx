import styled from "styled-components";
import casinoIcon from "@/assets/t17/images/account/navItem/icon-promotion.svg";

const SvgIconContainer = styled.div`
  width: 35px;
  height: 35px;
`;

const Promotion = ({ pathname, alt }: { pathname: string; alt?: string }) => {
  return (
    <SvgIconContainer>
      <img
        src={casinoIcon}
        alt={alt || ""}
        width={"100%"}
        height={"100%"}
      />
    </SvgIconContainer>
  )
};

export default Promotion;