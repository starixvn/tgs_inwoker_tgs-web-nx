import React, { useContext, useEffect, useState } from "react";
import { PageContainer } from "@/components/styled-component/PageContainer";
import AccountPaper from "@/components/project/AccountPaper";
import { i18n } from "@tgs-web-nx/utils";
import iconReward from "@/assets/t36/images/badge/icon-reward.svg";
import { theme } from "@/theme";
import { contextType, useRwd } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";
import { RewardContext, RewardContextProvider } from "@tgs-web-nx/core/hooks";
import { useQuery } from "@tanstack/react-query";
import { AccountService, MilestoneList, MilestonePromotionList } from "@tgs-web-nx/core";

const RewardPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isDesktopSize } = useRwd();
  const context = useContext(RewardContext) as contextType;
  const { data, isFetching } = useQuery({
    queryKey: ["MilestoneList"],
    queryFn: async () => {
      const res = await AccountService.getMilestoneList();
      context.setSelectedMilestone(res[0]);
      return res;
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const init = async () => {
      await context.setColors({
        titleColor: theme.primary,
        subTitleColor: theme.subNavSec,
        mainBg: "#D0DAE3",
        bonusBg: "#3281D0",
        indicatorBg: theme.primary,
      });

      setLoading(false);
    };
    init();
  }, []);

  return (
    <PageContainer>
      {isFetching ? (
        <Loading show={true} />
      ) : (
        <>
          <MilestonePromotionList milestoneList={data} />
          <AccountPaper pageName={i18n.t("common.Milestone")} iconUrl={iconReward}>
            {isDesktopSize && !loading && <MilestoneList />}
          </AccountPaper>
        </>
      )}
    </PageContainer>
  );
};

const RewardWithProvider = () => (
  <RewardContextProvider>
    <RewardPage />
  </RewardContextProvider>
);

export default RewardWithProvider;
