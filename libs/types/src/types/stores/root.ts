import {
  AccountState,
  BonusState,
  GameState,
  GeneralState,
  ModalState,
  UiState,
  WalletState,
} from "./index";

export interface RootState {
  ui: UiState;
  account: AccountState;
  bonus: BonusState;
  modal: ModalState;
  general: GeneralState;
  wallet: WalletState;
  game: GameState;
}
