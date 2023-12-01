import styled from "styled-components";

export const AuthFormContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 70px 36px 30px;
  overflow: auto;

  ::-webkit-scrollbar {
    visibility: hidden;
  }

  & > * {
    flex-shrink: 0;
  }
`;
