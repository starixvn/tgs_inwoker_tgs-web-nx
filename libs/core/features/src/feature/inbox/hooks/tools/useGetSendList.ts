import { useCallback, useEffect, useState } from "react";
import { GeneralService } from "@tgs-web-nx/core";
import { GetInboxListReqDto, SendItem } from "@tgs-web-nx/types";

interface SendListState {
  sendList: SendItem[];
  totalCount: number;
  isLoading: boolean;
  error: Error | null;
}
export function useGetSendList(getInboxListReqDto: GetInboxListReqDto) {
  const [sendListState, setSendListState] = useState<SendListState>({
    sendList: [],
    totalCount: 0,
    isLoading: false,
    error: null,
  });

  const fetchSendList = useCallback(async () => {
    try {
      setSendListState((prevState) => ({
        ...prevState,
        isLoading: true,
        error: null,
      }));
      const getInboxListResDto = await GeneralService.GetSendList(getInboxListReqDto);
      if (!getInboxListResDto.IsSuccess) {
        throw new Error(`Req failed, ${getInboxListReqDto}`);
      }

      const { items, totalcount } = getInboxListResDto.data;

      setSendListState((prevState) => ({
        sendList: items,
        totalCount: totalcount,
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      setSendListState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: error,
      }));
    }
  }, [JSON.stringify(getInboxListReqDto)]);

  useEffect(
    () => {
      fetchSendList();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(getInboxListReqDto)],
  );

  return {
    ...sendListState,
  };
}
