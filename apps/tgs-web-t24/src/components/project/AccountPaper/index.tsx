import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import PageBadge from "@/components/project/AccountPaper/components/PageBadge";
import { media } from "@/theme/breakpoints";

const AccountPaperContainer = styled.div`
  padding: 0;
  border-radius: 4px;

  ${media.sm} {
    background: ${({ theme }) => theme.gray95};
    padding: 20px 24px;
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
            marginBottom: "12px",
          }}
        />
      )}
      {children}
    </AccountPaperContainer>
  );
};

export default AccountPaper;
