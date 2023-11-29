import styled from "styled-components";

export const AuthFormContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 70px 36px 30px;
  overflow: scroll;

  ::-webkit-scrollbar {
    visibility: hidden;
  }

  & > * {
    flex-shrink: 0;
  }
`;
