import { useCallback, useEffect, useState } from "react";
import { GeneralService } from "@tgs-web-nx/core";
import { GetInboxListReqDto, InboxItem } from "@tgs-web-nx/types";

interface InboxListState {
  inboxList: InboxItem[];
  totalCount: number;
  isLoading: boolean;
  error: Error | null;
}
export function useGetInboxList(getInboxListReqDto: GetInboxListReqDto) {
  const [inboxListState, setInboxListState] = useState<InboxListState>({
    inboxList: [],
    totalCount: 0,
    isLoading: false,
    error: null,
  });

  const fetchInboxList = useCallback(async () => {
    try {
      setInboxListState((prevState) => ({
        ...prevState,
        isLoading: true,
        error: null,
      }));
      const getInboxListResDto = await GeneralService.GetInboxList(getInboxListReqDto);
      if (!getInboxListResDto.IsSuccess) {
        throw new Error(`Req failed, ${getInboxListReqDto}`);
      }

      const { items, totalcount } = getInboxListResDto.data;

      setInboxListState((prevState) => ({
        inboxList: items || [],
        totalCount: totalcount,
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      setInboxListState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: error,
      }));
    }
  }, [JSON.stringify(getInboxListReqDto)]);

  useEffect(
    () => {
      fetchInboxList();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(getInboxListReqDto)],
  );

  return {
    ...inboxListState,
  };
}
