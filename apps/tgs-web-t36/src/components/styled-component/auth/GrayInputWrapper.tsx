import styled from "styled-components";

export const GrayInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.grey10};
  overflow: visible;
  background-color: ${({ theme }) => theme.white};
`;
