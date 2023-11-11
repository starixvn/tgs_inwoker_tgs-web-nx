import { GetLocalizationResDto } from "@tgs-web-nx/types";
import { ApiService } from "../api-services/services/ApiService";
import { GeneralService as PrevGeneralService } from "../api-services/services/GeneralService";

export const GeneralService = {
  ...PrevGeneralService,
  GetLocalization,
};

function GetLocalization() {
  return ApiService.get(`localization`) as unknown as Promise<GetLocalizationResDto>;
}
