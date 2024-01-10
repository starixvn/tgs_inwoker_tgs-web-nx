import config from "@tgs-web-nx/config";
import { BankCard } from "@tgs-web-nx/types";

export function useShowAddCardButton(bankCardList: BankCard[]) {
  const {
    AddCard_NotAllowedEditDelete,
    ChangesNotAllowed,
    AddCard_MaximumCardAllowed,
    AddCard_DisableCreateUpdateDelete,
  } = config.features;


  const customizedBrandList = ["MOVN2"];
  const isCustomizedBrand = customizedBrandList.includes(config.brand);

  const isShowAddCardButton = bankCardList.length < AddCard_MaximumCardAllowed;

  const isManageCardButtonAvailable = !(
    ChangesNotAllowed ||
    AddCard_NotAllowedEditDelete ||
    AddCard_DisableCreateUpdateDelete
  );

  return {
    isCustomizedBrand,
    isShowAddCardButton,
    isManageCardButtonAvailable,
  };
}
