import styled from "styled-components";

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  background-color:  ${({ theme }) => theme.tableBackground};
  border-radius: ${({ theme }) => theme.tableBorderRadius};

`;
