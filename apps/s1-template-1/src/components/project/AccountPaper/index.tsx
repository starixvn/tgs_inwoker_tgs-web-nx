import React from "react";
import styled from "styled-components";

const AccountPaperContainer = styled.div`

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
