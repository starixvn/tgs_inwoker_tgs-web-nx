import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import PageBadge from "@/components/project/AccountPaper/components/PageBadge";
import { media } from "@/theme/breakpoints";

const AccountPaperContainer = styled.div`
  ${media.sm} {
    background: ${({ theme }) => theme.darkGray};
    border-radius: 10px;
    display: flex;
    padding: 24px 40px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    align-self: stretch;
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
            marginBottom: "12px",
          }}
        />
      )}
      {children}
    </AccountPaperContainer>
  );
};

export default AccountPaper;
