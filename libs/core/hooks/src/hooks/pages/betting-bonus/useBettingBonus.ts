import { VipData as TypeVipData } from "@tgs-web-nx/types";
import { useAccountStore } from "@tgs-web-nx/core";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useVipStore } from "@tgs-web-nx/core/hooks";

const productColumnNameMap: {
  [key: string]: string;
} = {
  "Live Dealer": "liveDealerRebate",
  "Sportsbook": "sportsRebate",
  "E-Game": "slotRebate",
  "Card Game": "cardGameRebate",
  "Lottery": "lotteryRebate",
  "Virtual Sports": "virtualSportsRebate",
};

export interface TypeProductRebateByLevel {
  name: string;
  rebate: number[];
}

export function useBettingBonus() {
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
      rebate: productRebateList,
    };
  });

  return {
    isLoading,
    currentLevel,
    productRebateByLevel,
    vipData
  };
}
