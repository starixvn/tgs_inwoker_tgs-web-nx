import styled from "styled-components";

export const GrayInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 2px;
  border: none;
  background: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.grey02};
  overflow: visible;
`;
