import { i18n } from "@tgs-web-nx/utils";
import iconReward from "@/assets/t29/images/account/navItem/icon-reward.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { PageContainer } from "@/components/styled-component/PageContainer";

import { theme } from "@/theme";
import { Reward } from "@tgs-web-nx/core";
import { media } from "@/theme/breakpoints";
import React from "react";

const RewardPage = () => {
  const rewardColors = React.useMemo(
    () => ({
      titleColor: theme.blue50,
      subTitleColor: theme.blue50,
      mainBg: theme.blue20,
      bonusBg: theme.blue40,
      indicatorBg: "#3CAEC1",
    }),
    [],
  );
  return (
    <PageContainer>
      <AccountPaper pageName={i18n.t("common.Milestone")} iconUrl={iconReward}>
        <Reward media={media} colors={rewardColors} />
      </AccountPaper>
    </PageContainer>
  );
};

export default RewardPage;
