import React from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";

const PaperContainer = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: 10px;
  padding: 16px 18px;

  ${media.sm} {
    background: transparent;
    padding: 0;
  }
`;

type Props = {
  children: React.ReactNode;
};

const WithdrawPaper = ({ children }: Props) => {
  return <PaperContainer>{children}</PaperContainer>;
};

export default WithdrawPaper;
