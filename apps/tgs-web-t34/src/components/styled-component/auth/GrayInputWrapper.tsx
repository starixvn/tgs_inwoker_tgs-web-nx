import styled from "styled-components";

export const GrayInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 30px;
  border: none;
  background: ${({ theme }) => theme.mainLightBackground};
  overflow: visible;
`;
