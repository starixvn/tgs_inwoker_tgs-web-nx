import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { media } from "@/theme/breakpoints";
import PageBadge from "@/components/project/AccountPaper/components/PageBadge";

const AccountPaperContainer = styled.div`
  padding: 0 0 20px 0;

  ${media.sm} {
    background: ${({ theme }) => theme.primaryLight};
    padding: 20px 24px;
    border-radius: 20px;
  }
`;

type Props = {
  pageName: string;
  iconUrl: string;
  children: React.ReactElement | React.ReactElement[];
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
            marginBottom: "31px",
          }}
        />
      )}
      {children}
    </AccountPaperContainer>
  );
};

export default AccountPaper;
