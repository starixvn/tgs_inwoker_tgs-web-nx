import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { WalletService } from "@tgs-web-nx/core";
import { useCallback, useState } from "react";
interface PlayerBucket {
  key: string;
  amount: number;
  iconUrl: string;
  activeIconUrl: string;
}

const initBucketList: PlayerBucket[] = [
  {
    key: "LiveDealer",
    amount: 0,
    iconUrl: `/src/assets/t29/images/wagering/LiveDealer.svg`,
    activeIconUrl: `/src/assets/t29/images/wagering/LiveDealeractive.svg`,
  },
  {
    key: "Sportsbook",
    amount: 0,
    iconUrl: `/src/assets/t29/images/wagering/Sportsbook.svg`,
    activeIconUrl: `/src/assets/t29/images/wagering/SportsbookActive.svg`,
  },
  {
    key: "Slot",
    amount: 0,
    iconUrl: `/src/assets/t29/images/wagering/Slot.svg`,
    activeIconUrl: `/src/assets/t29/images/wagering/SlotActive.svg`,
  },
  {
    key: "CardGame",
    amount: 0,
    iconUrl: `/src/assets/t29/images/wagering/CardGame.svg`,
    activeIconUrl: `/src/assets/t29/images/wagering/CardGameActive.svg`,
  },
  {
    key: "Lottery",
    amount: 0,
    iconUrl: `/src/assets/t29/images/wagering/Lottery.svg`,
    activeIconUrl: `/src/assets/t29/images/wagering/LotteryActive.svg`,
  },
  {
    key: "VirtualSports",
    amount: 0,
    iconUrl: `/src/assets/t29/images/wagering/VirtualSports.svg`,
    activeIconUrl: `/src/assets/t29/images/wagering/VirtualSportsActive.svg`,
  },
];

export function useWageringPage() {
  useUpdatePageName("Wagering");

  const [playerBuckets, setPlayerBuckets] = useState<PlayerBucket[]>(initBucketList);
  const [wageringRequirement, setWageringRequirement] = useState<number>(0);
  const [activeType, setActiveType] = useState<string>("");
  const fetchpPlayerBucket = useCallback(async () => {
    try {
      const playerBucketResDto = await WalletService.GetPlayerBucket();
      const newBucketList: PlayerBucket[] = [];
      playerBuckets.map((bucket) => {
        playerBucketResDto.data.map((data) => {
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
