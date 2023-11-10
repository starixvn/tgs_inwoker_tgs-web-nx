import {
  AccountState,
  BonusState,
  GameState,
  GeneralState,
  ModalState,
  UiState,
  WalletState,
} from "@tgs-web-nx/types";

export interface RootState {
  ui: UiState;
  account: AccountState;
  bonus: BonusState;
  modal: ModalState;
  general: GeneralState;
  wallet: WalletState;
  game: GameState;
}
