import styled from "styled-components";
import { useHistory } from "react-router";
import { useRwd } from "@tgs-web-nx/core/hooks";
import avatarImg from "@/assets/t30/images/header/icon-avatar.svg";
import avatarWhiteImg from "@/assets/t30/images/header/icon-avatar-white.svg";
import { media } from "@/theme/breakpoints";

const ContextMenuButtonContainer = styled.div`
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  width: 33px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  ${media.sm} {
    background: #276aa5;
  }
  & img {
    width: 20px;
    height: 20px;
  }
`;

const ContextMenuButton = () => {
  const history = useHistory();
  const { isMobileSize } = useRwd();

  return (
    <ContextMenuButtonContainer
      onClick={() => {
        isMobileSize ? history.push("/account") : history.push("/profile");
      }}
    >
      <AvatarContainer>
        <img src={isMobileSize ? avatarImg : avatarWhiteImg} alt="avatar" />
      </AvatarContainer>
    </ContextMenuButtonContainer>
  );
};

export default ContextMenuButton;
