import styled from "styled-components";

export const GrayInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.maskBlack20};
  border-radius: 4px;
  overflow: visible;
`;
