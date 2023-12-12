import styled from "styled-components";
import { useOnlineUser, useRwd } from "@tgs-web-nx/core/hooks";
import member from "@/assets/t31/images/home/member.svg";
import memberDesktop from "@/assets/t31/images/home/member_desktop.png";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1rem;
  font-weight: 400;
  min-width: 105px;
  padding: 4px 10px;
  gap: 6px;
`;

type Props = {
  $color: string;
};

const Text = styled.div<Props>`
  color: ${({ $color }) => $color};
`;

const OnlineUser = (props: { color: string }) => {
  const { onlineUser } = useOnlineUser();
  const { isDesktopSize } = useRwd();

  return (
    <Wrapper>
      <img src={isDesktopSize ? memberDesktop : member} alt="online member" />
      <Text $color={props.color}>{onlineUser ? onlineUser : ""}</Text>
    </Wrapper>
  );
};

export default OnlineUser;
