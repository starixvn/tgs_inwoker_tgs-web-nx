import styled from "styled-components";

export const GrayInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.primaryLight};
  border: 1px solid ${({ theme }) => theme.gray01};
  overflow: visible;
  border-radius: 5px;
`;
