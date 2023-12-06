import config from "@tgs-web-nx/config";
import { BankCard } from "@tgs-web-nx/types";

export function useShowAddCardButton(bankCardList: BankCard[]) {
  const {
    AddCard_NotAllowedEditDelete,
    ChangesNotAllowed,
    AddCard_MaximumCardAllowed,
    AddCard_DisableCreateUpdateDelete,
  } = config.features;

  const isDisableManageCardButton = !(
    AddCard_NotAllowedEditDelete ||
    ChangesNotAllowed ||
    (bankCardList.length >= AddCard_MaximumCardAllowed && AddCard_DisableCreateUpdateDelete)
  );

  const isShowAddCardButton = bankCardList.length < AddCard_MaximumCardAllowed;

  return {
    isDisableManageCardButton,
    isShowAddCardButton,
  };
}
