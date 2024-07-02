import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { WalletService } from "@tgs-web-nx/core";
import { useCallback, useState } from "react";
import { i18n } from "@tgs-web-nx/utils";

export enum GameTypeEnum {
  LiveDealer = "LiveDealer",
  Sportsbook = "Sportsbook",
  Slot = "Slot",
  CardGame = "CardGame",
  Lottery = "Lottery",
  VirtualSports = "VirtualSports",
}

type PlayerBucket = {
  key: GameTypeEnum;
  amount: number;
  lable: any;
  iconUrl?: string;
  activeIconUrl?: string;
};

export function useWageringPage() {
  const initBucketList: PlayerBucket[] = [
    {
      key: GameTypeEnum.LiveDealer,
      amount: 0,
      lable: i18n.t("common.live"),
    },
    {
      key: GameTypeEnum.Sportsbook,
      amount: 0,
      lable: i18n.t("common.sports"),
    },
    {
      key: GameTypeEnum.Slot,
      amount: 0,
      lable: i18n.t("common.table"),
    },
    {
      key: GameTypeEnum.CardGame,
      amount: 0,
      lable: i18n.t("common.chess"),
    },
    {
      key: GameTypeEnum.Lottery,
      amount: 0,
      lable: i18n.t("common.lottery"),
    },
    {
      key: GameTypeEnum.VirtualSports,
      amount: 0,
      lable: i18n.t("common.virtualsports"),
    },
  ];
  useUpdatePageName(i18n.t("wagering.wageringrequirement"));

  const [playerBuckets, setPlayerBuckets] = useState<PlayerBucket[]>(initBucketList);
  const [wageringRequirement, setWageringRequirement] = useState<number>(0);
  const [activeType, setActiveType] = useState<string>("");
  const fetchpPlayerBucket = useCallback(async () => {
    try {
      const playerBucketResDto = await WalletService.GetPlayerBucket();
      const newBucketList: PlayerBucket[] = [];
      initBucketList.map((bucket) => {
        playerBucketResDto.data.map((data) => {
          //buckettype = null 為主水桶
          if (data.buckettype === null) {
            setWageringRequirement(data.amount);
          }
          if (data.buckettype === bucket.key) {
            newBucketList.push({
              ...bucket,
              amount: data.amount,
            });
          }
        });
      });

      if (!playerBucketResDto.IsSuccess) {
        throw new Error(`Req failed, ${playerBucketResDto}`);
      }
      setPlayerBuckets(newBucketList);
    } catch (error: any) {
      setPlayerBuckets((prevState) => ({
        ...prevState,
        error: error,
      }));
    }
  }, []);

  return {
    activeType,
    setActiveType,
    wageringRequirement,
    playerBuckets,
    fetchpPlayerBucket,
  };
}
