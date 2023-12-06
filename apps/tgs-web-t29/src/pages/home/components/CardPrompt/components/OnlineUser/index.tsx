import styled from "styled-components";
import { useOnlineUser } from "@tgs-web-nx/core/hooks";
import member from "@/assets/t29/images/home/member.svg";

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

  return (
    <Wrapper>
      <img src={member} alt="online member" />
      <Text $color={props.color}>{onlineUser ? onlineUser : ""}</Text>
    </Wrapper>
  );
};

export default OnlineUser;
