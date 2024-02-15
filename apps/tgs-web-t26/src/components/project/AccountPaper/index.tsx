import React from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";

const AccountPaperContainer = styled.div`
  ${media.sm} {
    background: ${({ theme }) => theme.darkGray};
    padding: 30px;
  }
`;

type Props = {
  children: React.ReactNode | React.ReactNode[];
};
const AccountPaper = ({ children }: Props) => {
  return <AccountPaperContainer>{children}</AccountPaperContainer>;
};

export default AccountPaper;
