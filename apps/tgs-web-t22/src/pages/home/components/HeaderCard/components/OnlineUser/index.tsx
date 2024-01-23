import styled from "styled-components";
import { useOnlineUser } from "@tgs-web-nx/core/hooks";
import member from "@/assets/t22/images/header/member.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  padding: 0px 8px;

  &:after{
    content: '';
    margin-left: 8px;
    width: 2px;
    height: 16px;
    border-radius: 10px;
    background: ${({ theme }) => theme.white};
  }
`;

type Props = {
  $color: string;
};

const Text = styled.p<Props>`
  margin-left: 4px;
  color: ${({ $color }) => $color};
  font-size: 0.7rem;
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
