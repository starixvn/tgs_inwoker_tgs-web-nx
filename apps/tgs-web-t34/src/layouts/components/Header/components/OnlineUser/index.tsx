import styled from "styled-components";
import { useOnlineUser } from "@tgs-web-nx/core/hooks";
import member from "@/assets/t34/images/header/people.svg";

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 400;
  text-align: center;
  width: 108px;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.black};
  margin-left: 6px;
  text-align: center;
  font-family: Gill Sans MT;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
