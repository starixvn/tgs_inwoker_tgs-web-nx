import styled from "styled-components";

export const GrayInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  /* border: 1px solid ${({ theme }) => theme.gray}; */
  background-color: ${({ theme }) => theme.black};
  border-radius: 6px;
  /* overflow: visible; */
  position: relative;
`;
