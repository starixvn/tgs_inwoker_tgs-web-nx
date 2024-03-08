import { VipData as TypeVipData } from "@tgs-web-nx/types";
import { useAccountStore } from "@tgs-web-nx/core";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useVipStore } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";

const productColumnNameMap: {
  [key: string]: string;
} = {
  "Live Casino": "liveDealerRebate",
  "E-game": "slotRebate",
  "Card Game": "cardGameRebate",
  "Sports": "sportsRebate",
  "Virtual Sports": "virtualSportsRebate",
  "Lottery": "lotteryRebate",
};

export interface TypeProductRebateByLevel {
  name: string;
  rebate: number[];
  label: string;
}

export function useBettingBonus() {
  const columnNameTranslateMap: {
    [key: string]: string;
  } = {
    "Live Casino": i18n.t("vip.liveDealerRebate"),
    "E-game": i18n.t("vip.slotRebate"),
    "Card Game": i18n.t("vip.cardGameRebate"),
    "Sports": i18n.t("vip.sportsRebate"),
    "Virtual Sports": i18n.t("vip.virtualSportsRebate"),
    "Lottery": i18n.t("vip.lotteryRebate"),
  };

  const { vipData, isLoading } = useVipStore();
  const accountStore = useAccountStore();
  const currentLevel = accountStore.account.info.member_level_id;

  const productList = Object.keys(productColumnNameMap);
  const productRebateByLevel: TypeProductRebateByLevel[] = productList.map((product) => {
    const productRebateList = vipData.map((_, index) => {
      const targetLevel = index + 1;
      const vipLevelData = vipData.find((item) => item.level === targetLevel) as TypeVipData;

      const columnName = productColumnNameMap[product];

      if (vipLevelData && columnName in vipLevelData) {
        const rebate = vipLevelData[columnName as keyof TypeVipData];
        return rebate;
      } else {
        // Handle the case where the columnName is not found in vipLevelData
        return 0;
      }
    });
    return {
      name: product,
      label: columnNameTranslateMap[product],
      rebate: productRebateList,
    };
  });

  return {
    isLoading,
    currentLevel,
    productRebateByLevel,
    vipData,
  };
}
