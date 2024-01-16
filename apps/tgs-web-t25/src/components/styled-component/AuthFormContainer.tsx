import styled from "styled-components";
import BG from "@/assets/t25/images/loginBG.png";

export const AuthFormContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 22px;
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
  margin: 0 auto 20px;
`;

export const AuthDialogTitle = styled.div`
  font-size: 1.25rem;
  white-space: nowrap;
  font-weight: 700;
  line-height: 30px;
  margin-bottom: 36px;
  color: ${({ theme }) => theme.white};
`;

export const FormContainerWithBG = styled.div`
  height: 100%;
  background: url(${BG}) no-repeat center center;
`;
