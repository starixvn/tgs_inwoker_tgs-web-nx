import { media } from "@/theme/breakpoints";
import React from "react";
import styled from "styled-components";

const AccountPaperContainer = styled.div`
  ${media.sm} {
    padding: 30px;
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
