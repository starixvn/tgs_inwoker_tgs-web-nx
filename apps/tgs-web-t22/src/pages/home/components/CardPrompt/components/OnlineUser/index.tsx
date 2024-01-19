import styled from "styled-components";
import { useOnlineUser } from "@tgs-web-nx/core/hooks";
import member from "@/assets/t22/images/header/member.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  padding: 4px 10px;
  gap: 6px;
`;

type Props = {
  $color: string;
};

const Text = styled.p<Props>`
  color: ${({ $color }) => $color};
  font-size: 0.7rem;
`;

const  OnlineUser = (props: { color: string }) => {
  const { onlineUser } = useOnlineUser();

  return (
    <Wrapper>
      <img src={member} alt="online member" />
      <Text $color={props.color}>{onlineUser ? onlineUser : ""}</Text>
    </Wrapper>
  );
};

export default OnlineUser;
