import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import PageBadge from "@/components/project/AccountPaper/components/PageBadge";
import { media } from "@/theme/breakpoints";
import { theme } from "@/theme";

type PaperProps = {
  $hidePaperColorInMobile: boolean;
  theme: typeof theme;
};
const AccountPaperContainer = styled.div<PaperProps>`
  background: ${({ theme, $hidePaperColorInMobile }: PaperProps) =>
    $hidePaperColorInMobile ? "transparent" : theme.white};
  padding: ${({ $hidePaperColorInMobile }: PaperProps) =>
    $hidePaperColorInMobile ? "0px" : "16px 17px"};
  ${media.sm} {
    //background: ${({ theme }) => theme.mainBackground};
    //padding: 30px;
  }
`;

const Divider = styled.div`
  width: 100%;
  margin-bottom: 10px;
  border-bottom: ${({ theme }) => `1px solid ${theme.gray30}`};
`;

type Props = {
  pageName: string;
  iconUrl: string;
  children: React.ReactNode | React.ReactNode[];
  hidePaperColorInMobile?: boolean;
};
const AccountPaper = ({ pageName, iconUrl, children, hidePaperColorInMobile }: Props) => {
  const { isDesktopSize } = useRwd();

  return (
    <AccountPaperContainer $hidePaperColorInMobile={!!hidePaperColorInMobile}>
      {isDesktopSize && (
        <>
          <Divider />
          <PageBadge
            iconUrl={iconUrl}
            text={pageName}
            style={{
              marginBottom: "20px",
            }}
          />
        </>
      )}
      {children}
    </AccountPaperContainer>
  );
};

export default AccountPaper;
