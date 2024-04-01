import { FilterDepositList } from "@tgs-web-nx/types";

/**
 * 篩選 Deposit List
 */
export const getFilterDepositList = (list: FilterDepositList[], code: string) => {
  return list.find(row => row.code === code)?.channels.sort((prev, next) => next.displayorder - prev.displayorder) ?? [];
};

/**
 * 選擇 code
 */
export const handleChangeCode = (code: string, setCode: (code: string) => void, callback?: () => void) => {
  setCode(code);
  
  if(callback) {
    callback();
  }
};
