import styled from "styled-components";
import BG from "@/assets/t29/images/loginBG.png";

export const AuthFormContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  overflow: auto;

  ::-webkit-scrollbar {
    visibility: hidden;
  }

  & > * {
    flex-shrink: 0;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
`;

export const LoginTitle = styled.div`
  font-size: 16px;
  white-space: nowrap;
  font-weight: 700;
  line-height: 55px;
  letter-spacing: 0em;
  text-align: center;
  color: ${({ theme }) => theme.white};
`;

export const FormContainerWithBG = styled.div`
  height: 100%;
  background: url(${BG}) no-repeat center center;
`;
