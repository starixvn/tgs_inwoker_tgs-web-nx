import { media } from "@/theme/breakpoints";
import React from "react";
import styled from "styled-components";

export const AccountPaperContainer = styled.div`
  width: 100%;
  padding-bottom: ${({ theme }) => theme.paddingBottomContent};
  ${media.sm} {
    max-width: ${({ theme }) => theme.mainContentWidth};
    padding: 2.4rem;
    border: 1px solid ${({ theme }) => theme.mainContentBorderColor};
    background: ${({ theme }) => theme.mainContentBackgroundColor};
    margin: auto;
    border-radius: 1.2rem;
    font-size: 1.4rem;
  }
`;

type Props = {
  pageName: string;
  iconUrl: string;
  children: React.ReactNode | React.ReactNode[];
};
const AccountPaper = ({ pageName, iconUrl, children }: Props) => {
  return <AccountPaperContainer>
         {/* <AccountHeaderContent /> */}
        {children}
    </AccountPaperContainer>;
};

export default AccountPaper;
