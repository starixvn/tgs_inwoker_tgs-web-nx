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

const Text = styled.div`
  color: ${({ theme }) => theme.white};
`;

const OnlineUser = () => {
  const { onlineUser } = useOnlineUser();

  return (
    <Wrapper>
      <img src={member} alt="online member" />
      <Text>{onlineUser ? onlineUser : ""}</Text>
    </Wrapper>
  );
};

export default OnlineUser;
