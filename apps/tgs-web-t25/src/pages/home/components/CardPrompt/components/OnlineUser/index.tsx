import styled from "styled-components";
import { useOnlineUser } from "@tgs-web-nx/core/hooks";
import member from "@/assets/t25/images/home/member.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 400;
  min-width: 105px;
  gap: 6px;
  background: ${({ theme }) => theme.secondary};
  padding: 9px;
  border-radius: 6px;
`;

type Props = {
  $color: string;
};

const Text = styled.div<Props>`
  color: ${({ $color }) => $color};
`;

const IconContainer = styled.div`
  background: ${({ theme }) => theme.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OnlineUser = (props: { color: string }) => {
  const { onlineUser } = useOnlineUser();

  return (
    <Wrapper>
      <IconContainer>
        <img src={member} alt="online member" />
      </IconContainer>
      <Text $color={props.color}>{onlineUser ? onlineUser : ""}</Text>
    </Wrapper>
  );
};

export default OnlineUser;
