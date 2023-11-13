import styled from "styled-components";
import { useOnlineUser } from "@tgs-web-nx/core/hooks";
import member from "@/assets/t23/images/home/member.svg";

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 400;
  text-align: center;
  width: 108px;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.white};
  margin-left: 6px;
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
