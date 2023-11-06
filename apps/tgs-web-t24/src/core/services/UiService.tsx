import { ApiService } from "@/api-services/services/ApiService";
import { GetMarqueeResDto } from "@/core/models/dto/ui/GetMarqueeResDto";
import { GerMaintenanceResDto } from "@/core/models/dto/ui/GetMaintenanceResDto";

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
