import { GeneralState } from "@/core/types/stores/general";
import { UiState } from "@/core/types/stores/ui";
import { AccountState } from "@/core/types/stores/account";
import { BonusState } from "@/core/types/stores/bonus";
import { ModalState } from "@/core/types/stores/modal";
import { WalletState } from "@/core/types/stores/wallet";
import { GameState } from "@/core/types/stores/game";

export interface RootState {
  ui: UiState;
  account: AccountState;
  bonus: BonusState;
  modal: ModalState;
  general: GeneralState;
  wallet: WalletState;
  game: GameState;
}
