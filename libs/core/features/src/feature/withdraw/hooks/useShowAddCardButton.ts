import config from "@tgs-web-nx/config";
import { BankCard } from "@tgs-web-nx/types";

export function useShowAddCardButton(bankCardList: BankCard[]) {
  const {
    AddCard_NotAllowedEditDelete,
    ChangesNotAllowed,
    AddCard_MaximumCardAllowed,
    AddCard_DisableCreateUpdateDelete,
  } = config.features;


  const hiddenAddBankBtnBrand = ["MOVN2"];
  const customizedBrand = hiddenAddBankBtnBrand.includes(config.brand);

  const isShowAddCardButton = bankCardList.length < AddCard_MaximumCardAllowed && !customizedBrand;

  const isManageCardButtonAvailable = !(
    ChangesNotAllowed ||
    AddCard_NotAllowedEditDelete ||
    AddCard_DisableCreateUpdateDelete
  );

  return {
    isShowAddCardButton,
    isManageCardButtonAvailable,
  };
}
