import styled from "styled-components";

export const GrayInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.inputBGC};
  border: 1px solid ${({ theme }) => theme.grey07};
  border-radius: 6px;
  overflow: visible;
`;
