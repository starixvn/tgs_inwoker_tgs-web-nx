import { useEffect, useState, useContext, memo } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useQuery } from "@tanstack/react-query";

import { PageContainer } from "@/components/styled-component/PageContainer";
import AccountPaper from "@/components/project/AccountPaper";
import iconReward from "@/assets/t29/images/account/navItem/icon-reward.svg";
import Loading from "@/components/UI/Loading";
import { theme } from "@/theme";

import { contextType, useRwd } from "@tgs-web-nx/core/hooks";
import { AccountService, MilestoneList, MilestonePromotionList } from "@tgs-web-nx/core";
import { RewardContext, RewardContextProvider } from "@tgs-web-nx/core/hooks";
import { useUpdatePageName } from "@tgs-web-nx/core/features";

const RewardPage = () => {
  useUpdatePageName(i18n.t("common.Milestone"));
  const [loading, setLoading] = useState<boolean>(true);

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
        titleColor: theme.blue50,
        subTitleColor: theme.blue50,
        mainBg: theme.blue20,
        bonusBg: theme.blue40,
        indicatorBg: "#3CAEC1",
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

const RewardWithProvider = memo(() => (
  <RewardContextProvider>
    <RewardPage />
  </RewardContextProvider>
));

export default RewardWithProvider;
