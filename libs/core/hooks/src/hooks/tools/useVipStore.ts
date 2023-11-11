import { useEffect, useState } from "react";
import { VipData } from "@tgs-web-nx/types";
import { useGeneralStore } from "@tgs-web-nx/core";

export const useVipStore = () => {
  const { getVIP } = useGeneralStore();
  const [vipData, setVipData] = useState<VipData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGetVIP = async () => {
      try {
        setIsLoading(true);
        const getVipResDto = await getVIP();
        if (getVipResDto?.IsSuccess) {
          setVipData(getVipResDto?.data?.items);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching VIP api:", error);
      }
    };
    fetchGetVIP();
  }, []);

  return {
    setVipData,
    vipData,
    isLoading,
  };
};
