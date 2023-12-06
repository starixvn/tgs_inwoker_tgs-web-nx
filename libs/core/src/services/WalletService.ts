import {
  GetAutoTransferStatusResDto,
  GetBankCardListResDto,
  UpdateAutoTransferStatusResDto,
} from "@tgs-web-nx/types";
import { WalletService as PrevWalletService } from "../api-services/services/WalletService";
import { ApiService } from "../api-services/services/ApiService";

export const WalletService = {
  ...PrevWalletService,
  GetAutoTransferStatus,
  UpdateAutoTransferStatus,
  GetBankCardList,
};

function GetAutoTransferStatus() {
  return ApiService.get(
    "player/game/auto-transfer",
  ) as unknown as Promise<GetAutoTransferStatusResDto>;
}

function UpdateAutoTransferStatus() {
  return ApiService.post(
    "player/game/auto-transfer",
    {},
  ) as unknown as Promise<UpdateAutoTransferStatusResDto>;
}

function GetBankCardList() {
  return ApiService.get("bankinfo") as unknown as Promise<GetBankCardListResDto>;
}
