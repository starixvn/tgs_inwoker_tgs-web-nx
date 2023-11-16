import React from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";

const AccountPaperContainer = styled.div`
  padding: 0;

  ${media.sm} {
    background: ${({ theme }) => theme.mainBackground};
    padding: 20px 24px;
  }
`;

type Props = {
  pageName: string;
  iconUrl: string;
  children: React.ReactElement | React.ReactElement[];
};
const AccountPaper = ({ pageName, iconUrl, children }: Props) => {
  return <AccountPaperContainer>{children}</AccountPaperContainer>;
};

export default AccountPaper;
