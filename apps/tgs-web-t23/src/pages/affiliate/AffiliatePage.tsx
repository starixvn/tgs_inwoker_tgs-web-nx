import React from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import Affiliate from "@/core/components/Affiliate";
import { useRwd } from "@/core/hooks/tools/useRwd";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconAffiliate from "@/assets/t23/images/badge/icon-affiliate.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const AffiliateContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(1200px + 22px * 2);
  margin: auto;
`;

type Props = {};
const AffiliatePage = (props: Props) => {
  useUpdatePageName(i18n.t("affiliate.title"));
  const { isDesktopSize } = useRwd();

  return (
    <AffiliateContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("affiliate.title")} iconUrl={iconAffiliate}>
        <Affiliate />
      </AccountPaper>
    </AffiliateContainer>
  );
};

export default AffiliatePage;
