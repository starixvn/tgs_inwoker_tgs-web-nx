import styled from "styled-components";

export const AuthFormContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 70px 20px 30px;
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
  font-size: 40px;
  white-space: nowrap;
  font-weight: 700;
  line-height: 55px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.primary};
`;
