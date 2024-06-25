import styled from "styled-components";
import { useHistory } from "react-router";
import { useRwd } from "@tgs-web-nx/core/hooks";
import avatarImg from "@/assets/t33/images/account/avatar.svg";

const ContextMenuButtonContainer = styled.div`
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  width: 33px;
  height: 33px;
  background: url(${avatarImg}) no-repeat center center;
  background-size: cover;
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
      <AvatarContainer />
    </ContextMenuButtonContainer>
  );
};

export default ContextMenuButton;
