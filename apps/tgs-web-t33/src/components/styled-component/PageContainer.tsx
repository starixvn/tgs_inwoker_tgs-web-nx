import styled from "styled-components";

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 22px;
  max-width: calc(961px + 22px * 2);
  flex: 1;
  margin: 0 auto;
`;

export const TransferPageContainer = styled.div`
  padding: 22px;
  max-width: calc(961px + 22px * 2);
  flex: 1;
  margin: 0 auto;

  & .MuiButton-fullWidth {
    max-width: 242px !important;
    display: block !important;
    margin: auto !important;
  }
`;
