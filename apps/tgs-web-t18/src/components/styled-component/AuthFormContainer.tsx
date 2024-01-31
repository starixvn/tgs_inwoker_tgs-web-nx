import styled from "styled-components";

export const AuthFormContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px - 82px);
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 30px 32px;
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
  //max-width: 400px;
  margin: 0 auto 20px;
`;
