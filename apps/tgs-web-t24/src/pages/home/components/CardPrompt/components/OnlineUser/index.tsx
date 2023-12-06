import styled from "styled-components";
import { useOnlineUser } from "@tgs-web-nx/core/hooks";
import member from "@/assets/t24/images/home/member.svg";

const Wrapper = styled.div`
  min-width: 100px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  text-align: right;
  padding: 4px 10px;
  gap: 6px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.gray80};
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
