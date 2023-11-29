import {
  GetLocalizationResDto,
  GetInboxListReqDto,
  GetInboxListResDto,
  GetSendListResDto,
  GetSendListReqDto,
  GetSendItemDetailResDto,
  GetSendItemDetailReqDto,
} from "@tgs-web-nx/types";
import { GetInboxItemDetailReqDto } from "@tgs-web-nx/types";
import { GetInboxItemDetailResDto } from "@tgs-web-nx/types";
import { ApiService } from "../api-services/services/ApiService";
import { GeneralService as PrevGeneralService } from "../api-services/services/GeneralService";

export const GeneralService = {
  ...PrevGeneralService,
  GetLocalization,
  GetInboxList,
  GetInboxItemDetail,
  GetSendList,
  GetSendItemDetail,
};

function GetLocalization() {
  return ApiService.get(`localization`) as unknown as Promise<GetLocalizationResDto>;
}

function GetInboxList(getInboxListReqDto: GetInboxListReqDto) {
  const { page = 1, row = 10 } = getInboxListReqDto;

  const endpoint = `station-letter?page=${page || 1}&rows=${row || 10}`;
  return ApiService.get(endpoint) as unknown as Promise<GetInboxListResDto>;
}

function GetInboxItemDetail(getInboxListReqDto: GetInboxItemDetailReqDto) {
  const { letterId = "" } = getInboxListReqDto;

  const endpoint = `station-letter/${letterId}`;
  return ApiService.get(endpoint) as unknown as Promise<GetInboxItemDetailResDto>;
}

function GetSendList(getSendListReqDto: GetSendListReqDto) {
  const { page = 1, row = 10 } = getSendListReqDto;

  const endpoint = `delivery-box?page=${page || 1}&rows=${row || 10}`;
  return ApiService.get(endpoint) as unknown as Promise<GetSendListResDto>;
}

function GetSendItemDetail(getSendItemDetailReqDto: GetSendItemDetailReqDto) {
  const { deliveryId = "" } = getSendItemDetailReqDto;

  const endpoint = `delivery-box/${deliveryId}`;
  return ApiService.get(endpoint) as unknown as Promise<GetSendItemDetailResDto>;
}
