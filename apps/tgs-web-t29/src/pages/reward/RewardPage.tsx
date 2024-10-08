import { useEffect, useState, useContext, memo } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useQuery } from "@tanstack/react-query";

import { PageContainer } from "@/components/styled-component/PageContainer";
import AccountPaper from "@/components/project/AccountPaper";
import iconReward from "@/assets/t29/images/account/navItem/icon-reward.svg";
import Loading from "@/components/UI/Loading";
import { theme } from "@/theme";

import { useRwd } from "@tgs-web-nx/core/hooks";
import { AccountService, MilestoneList, MilestonePromotionList } from "@tgs-web-nx/core";
import { contextType, RewardContext, useUpdatePageName } from "@tgs-web-nx/core/features";
import { GetMilestoneListResDto, MilestoneType } from "@tgs-web-nx/types";

const RewardPage = () => {
  useUpdatePageName(i18n.t("reward.milestone"));
  const context = useContext(RewardContext) as contextType;

  const [loading, setLoading] = useState<boolean>(false);

  const { isDesktopSize } = useRwd();
  const { data, isFetching } = useQuery({
    queryKey: ["MilestoneList"],
    queryFn: async () => {
      const res = await AccountService.getMilestoneList();
      if (res.IsSuccess) {
        const newSelectedMilestone = res.data.find(
          (item: MilestoneType) => item.promotionId === context.selectedMilestone.promotionId,
        );
        context.setSelectedMilestone(newSelectedMilestone ? newSelectedMilestone : res.data[0]);
        return res;
      }
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const init = async () => {
      await context.setColors({
        titleColor: theme.blue50,
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
          <MilestonePromotionList milestoneList={data as GetMilestoneListResDto} />
          <AccountPaper pageName={i18n.t("reward.milestone")} iconUrl={iconReward}>
            {isDesktopSize && !loading && <MilestoneList />}
          </AccountPaper>
        </>
      )}
    </PageContainer>
  );
};

export default RewardPage;
