import { WalletService as PrevWalletService } from "../api-services/services/WalletService";
import { ApiService } from "../api-services/services/ApiService";
import { GetAutoTransferStatusResDto } from "../../../types/src/types/dto/wallet/GetAutoTransferStatusResDto";
import { UpdateAutoTransferStatusResDto } from "@tgs-web-nx/types";

export const WalletService = {
  ...PrevWalletService,
  GetAutoTransferStatus,
  UpdateAutoTransferStatus,
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
