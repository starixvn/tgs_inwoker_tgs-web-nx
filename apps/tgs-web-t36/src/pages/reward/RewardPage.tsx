import React, { memo, useContext, useEffect, useState } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useQuery } from "@tanstack/react-query";

import { PageContainer } from "@/components/styled-component/PageContainer";
import AccountPaper from "@/components/project/AccountPaper";
import iconReward from "@/assets/t36/images/badge/icon-reward.svg";
import Loading from "@/components/UI/Loading";
import { theme } from "@/theme";

import { contextType, useRwd } from "@tgs-web-nx/core/hooks";
import { AccountService, MilestoneList, MilestonePromotionList } from "@tgs-web-nx/core";
import { RewardContext, RewardContextProvider } from "@tgs-web-nx/core/hooks";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { GetMilestoneListResDto } from "@tgs-web-nx/types";

const RewardPage = () => {
  useUpdatePageName(i18n.t("reward.milestone"));
  const [loading, setLoading] = useState<boolean>(false);
  const { isDesktopSize } = useRwd();
  const context = useContext(RewardContext) as contextType;
  const { data, isFetching } = useQuery({
    queryKey: ["MilestoneList"],
    queryFn: async () => {
      const res = await AccountService.getMilestoneList();
      context.setSelectedMilestone(res.data[0]);
      return res;
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const init = async () => {
      await context.setColors({
        titleColor: theme.primary,
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
          <MilestonePromotionList milestoneList={data as GetMilestoneListResDto} />
          <AccountPaper pageName={i18n.t("reward.milestone")} iconUrl={iconReward}>
            {isDesktopSize && !loading && <MilestoneList />}
          </AccountPaper>
        </>
      )}
    </PageContainer>
  );
};

const RewardWithProvider = memo(() => (
  <RewardContextProvider>
    <RewardPage />
  </RewardContextProvider>
));

export default RewardWithProvider;
