import styled from "styled-components";

export const GrayInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.white};
  border-bottom: 1px solid ${({ theme }) => theme.gray10};
  overflow: visible;
`;
