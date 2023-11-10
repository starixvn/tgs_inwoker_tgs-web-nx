import { GerMaintenanceResDto, GetMarqueeResDto } from "@tgs-web-nx/types";
import { ApiService } from "@/api-services/services/ApiService";

function GetMarquee(language: string) {
  return ApiService.get(`announcement/list/${language}`) as unknown as Promise<GetMarqueeResDto>;
}

function GetMaintenance() {
  return ApiService.get(`brand/maintenance`) as unknown as Promise<GerMaintenanceResDto>;
}

export const UiService = {
  GetMarquee,
  GetMaintenance,
};
