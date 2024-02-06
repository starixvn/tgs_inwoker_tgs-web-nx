import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Icon from "@/components/project/Icon";
import iconClose from "@/assets/t22/images/dialog/icon-close.svg";
import iconCloseMobile from "@/assets/t29/images/dialog/icon-close.svg";
import { media } from "@/theme/breakpoints";

const PopupHeaderContainer = styled.div`
  padding: 10px;
`;

const IconContainer = styled.div`
  margin-left: auto;
  padding: 5px;
  width: 25px;
  cursor: pointer;

  ${media.sm} {
    width: 40px;
    border-radius: 100%;
    background: ${({theme}) => theme.primaryGradient};
  }
`;

type Props = {
  handleClose: () => void;
};
const PopupHeader = ({ handleClose }: Props) => {
  const {isMobileSize} = useRwd();

  return (
    <PopupHeaderContainer>
      <IconContainer onClick={handleClose}>
        <Icon iconUrl={isMobileSize ? iconCloseMobile : iconClose} width={"100%"} height={"100%"} />
      </IconContainer>
    </PopupHeaderContainer>
  );
};

export default PopupHeader;
