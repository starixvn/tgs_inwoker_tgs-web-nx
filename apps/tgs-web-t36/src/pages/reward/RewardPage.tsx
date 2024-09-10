import React from "react";
import { PageContainer } from "@/components/styled-component/PageContainer";
import AccountPaper from "@/components/project/AccountPaper";
import { i18n } from "@tgs-web-nx/utils";
import iconReward from "@/assets/t36/images/badge/icon-reward.svg";
import { Reward } from "@tgs-web-nx/core";
import { theme } from "@/theme";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { media } from "@/theme/breakpoints";

const ProfilePage = () => {
  useUpdatePageName("VIP");

  const rewardColors = React.useMemo(
    () => ({
      titleColor: theme.primary,
      subTitleColor: theme.subNavSec,
      mainBg: "#D0DAE3",
      bonusBg: "#3281D0",
      indicatorBg: theme.primary,
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

export default React.memo(ProfilePage);
