import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import PageBadge from "@/components/project/AccountPaper/components/PageBadge";
import { media } from "@/theme/breakpoints";

const AccountPaperContainer = styled.div`
  ${media.sm} {
    //background: ${({ theme }) => theme.black03};
    //padding: 30px;
    //border-radius: 10px;
  }
`;

export const Paper = styled.div`
  ${media.sm} {
    background: ${({ theme }) => theme.black03};
    padding: 24px 40px;
    border-radius: 10px;
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
      <Paper>{children}</Paper>
    </AccountPaperContainer>
  );
};

export default AccountPaper;
