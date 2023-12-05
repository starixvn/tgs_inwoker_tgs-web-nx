import { WalletService } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
// import { i18n } from "@tgs-web-nx/utils";
import { useCallback, useState } from "react";
// interface PlayerBucket {
//   amount: number;
//   buckettype: string;
// }

interface PlayerBucket {
  key: string;
  lable: string;
  amount: number;
  iconUrl: string;
  activeIconUrl: string;
}

// const BucketList = [
//   {
//     key: "LiveDealer",
//     label: i18n.t("common.live"),
//     iconUrl: null,
//     amount: null,
//   },
//   {
//     key: "Sportsbook",
//     label: i18n.t("common.sports"),
//     iconUrl: null,
//     amount: null,
//   },
//   {
//     key: "Slot",
//     label: i18n.t("common.slot"),
//     iconUrl: null,
//     amount: null,
//   },
//   {
//     key: "CardGame",
//     label: i18n.t("common.cardGame"),
//     iconUrl: null,
//     amount: null,
//   },
//   {
//     key: "Lottery",
//     label: i18n.t("common.lottery"),
//     iconUrl: null,
//     amount: null,
//   },
//   {
//     key: "VirtualSports",
//     label: i18n.t("common.virtualsports"),
//     iconUrl: null,
//     amount: null,
//   },
// ];

export function useWageringPage() {
  const [playerBuckets, setPlayerBuckets] = useState<PlayerBucket[]>([]);

  const fetchpPlayerBucket = useCallback(async () => {
    try {
      const playerBucketResDto = await WalletService.GetPlayerBucket();

      // playerBucketResDto.data.map((data) => {
      //   newBucketList.push({
      //     key: data.buckettype,
      //     type: data.buckettype,
      //     amount: data.amount,
      //     iconUrl: `/src/assets/t29/images/wagering/${data.buckettype}.svg`,
      //     activeIconUrl: `/src/assets/t29/images/wagering/${data.buckettype}-active.svg`,
      //   });
      // });
      // console.log(playerBucketResDto);
      // let buckets = [];
      // playerBucketResDto.data.map((item) => {
      //   buckets.push({
      //     gameType: item.buckettype,
      //     amount: item.amount,
      //     iconUrl: `/src/assets/t29/images/wagering/${item.buckettype}.svg`,
      //   });
      // });
      if (!playerBucketResDto.IsSuccess) {
        throw new Error(`Req failed, ${playerBucketResDto}`);
      }
      // setPlayerBuckets(newBucketList);
    } catch (error: any) {
      setPlayerBuckets((prevState) => ({
        ...prevState,
        error: error,
      }));
    }
  }, []);

  return {
    playerBuckets,
    fetchpPlayerBucket,
  };
}
