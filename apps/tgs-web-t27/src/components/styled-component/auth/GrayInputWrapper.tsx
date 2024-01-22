import styled from "styled-components";

export const GrayInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  /* border: 1px solid ${({ theme }) => theme.gray}; input外框線 */
  border-radius: 6px;
  /* overflow: visible; */
  background-color: ${({ theme }) => theme.g5};
`;
