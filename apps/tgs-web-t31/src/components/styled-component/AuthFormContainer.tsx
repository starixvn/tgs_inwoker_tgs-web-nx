import styled from "styled-components";
<<<<<<< develop
import BG from "@/assets/t29/images/loginBG.png";
=======
>>>>>>> refactor: update auth structure

export const AuthFormContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
<<<<<<< develop
  padding: 0 12px;
=======
  padding: 70px 20px 30px;
>>>>>>> refactor: update auth structure
  overflow: auto;

  ::-webkit-scrollbar {
    visibility: hidden;
    width: 0;
  }

  & > * {
    flex-shrink: 0;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export const LoginTitle = styled.div`
<<<<<<< develop
  font-size: 16px;
=======
  font-size: 40px;
>>>>>>> refactor: update auth structure
  white-space: nowrap;
  font-weight: 700;
  line-height: 55px;
  letter-spacing: 0em;
  text-align: center;
<<<<<<< develop
  color: ${({ theme }) => theme.white};
`;

export const FormContainerWithBG = styled.div`
  height: 100%;
  background: url(${BG}) no-repeat center center;
=======
  margin-bottom: 50px;
  color: ${({ theme }) => theme.primary};
>>>>>>> refactor: update auth structure
`;
