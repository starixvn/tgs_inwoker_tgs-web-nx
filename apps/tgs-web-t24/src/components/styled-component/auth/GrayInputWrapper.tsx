import styled from "styled-components";

export const GrayInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: none;
  background: #111922;
  overflow: visible;

  input {
    color: ${({ theme }) => theme.gray10} !important;
  }
`;
