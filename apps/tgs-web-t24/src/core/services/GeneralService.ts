import { ApiService } from "@/api-services/services/ApiService";
import { GeneralService as PrevGeneralService } from "@/api-services/services/GeneralService";
import { GetLocalizationResDto } from "@/core/types/dto/general/GetLocalizationResDto";

export const GeneralService = {
  ...PrevGeneralService,
  GetLocalization,
};

function GetLocalization() {
  return ApiService.get(`localization`) as unknown as Promise<GetLocalizationResDto>;
}
