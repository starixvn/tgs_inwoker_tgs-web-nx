import React from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";

const AccountPaperContainer = styled.div`
  ${media.sm} {
    background: ${({ theme }) => theme.inputBGC};
    padding: 30px;
  }
`;

type Props = {
  pageName: string;
  iconUrl: string;
  children: React.ReactNode | React.ReactNode[];
};
const AccountPaper = ({ pageName, iconUrl, children }: Props) => {
  return <AccountPaperContainer>{children}</AccountPaperContainer>;
};

export default AccountPaper;
