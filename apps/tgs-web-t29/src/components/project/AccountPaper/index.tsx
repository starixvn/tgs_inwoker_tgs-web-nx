import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import PageBadge from "@/components/project/AccountPaper/components/PageBadge";
import { media } from "@/theme/breakpoints";

const AccountPaperContainer = styled.div`
  ${media.sm} {
    background: ${({ theme }) => theme.mainBackground};
    padding: 30px;
  }
`;

type Props = {
  pageName: string;
  iconUrl: string;
  children: React.ReactNode | React.ReactNode[];
};
const AccountPaper = ({ pageName, iconUrl, children }: Props) => {
  const { isDesktopSize } = useRwd();

  return (
    <AccountPaperContainer>
      {isDesktopSize && (
        <PageBadge
          iconUrl={iconUrl}
          text={pageName}
          style={{
            marginBottom: "20px",
          }}
        />
      )}
      {children}
    </AccountPaperContainer>
  );
};

export default AccountPaper;
