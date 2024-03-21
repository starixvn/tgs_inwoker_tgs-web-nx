import styled from "styled-components";
import { useOnlineUser } from "@tgs-web-nx/core/hooks";
import member from "@/assets/t36/images/home/member.svg";

const Wrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  background: ${({ theme }) => theme.g4};
  border-radius: 3px;
`;

type Props = {
  $color: string;
};

const Text = styled.div<Props>`
  color: ${({ $color }) => $color};
`;

const OnlineUser = (props: { color: string }) => {
  const { onlineUser } = useOnlineUser();

  return (
    <Wrapper>
      <img src={member} alt="online member" />
      <Text $color={props.color}>{onlineUser ? onlineUser : ""}</Text>
    </Wrapper>
  );
};

export default OnlineUser;
