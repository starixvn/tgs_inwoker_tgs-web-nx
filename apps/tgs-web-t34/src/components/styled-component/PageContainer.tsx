import styled from "styled-components";

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.black};
  padding: 20px;
  max-width: calc(1200px + 22px * 2);
  flex: 1;
  margin: auto;
`;

export const TransferPageContainer = styled.div`
  padding: 20px;
  max-width: calc(1200px + 22px * 2);
  flex: 1;

  & .MuiButton-fullWidth {
    max-width: 242px !important;
    display: block !important;
    margin: auto !important;
  }
`;
