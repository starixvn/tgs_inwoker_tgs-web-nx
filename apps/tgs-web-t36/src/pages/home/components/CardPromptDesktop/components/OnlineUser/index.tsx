import styled from "styled-components";
import { useOnlineUser } from "@tgs-web-nx/core/hooks";
import member from "@/assets/t36/images/home/member.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.875rem;
  font-weight: 400;
  min-width: 105px;
  padding: 10px 12px;
  height: 32px;
  gap: 6px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.lightGold};
  background: ${({ theme }) => theme.darkPrimary};
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
