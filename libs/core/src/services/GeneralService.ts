import {
  ComposeInboxItemReqDto,
  ComposeInboxItemResDto,
  GetInboxItemDetailReqDto,
  GetInboxItemDetailResDto,
  GetInboxListReqDto,
  GetInboxListResDto,
  GetLocalizationResDto,
  GetSendItemDetailReqDto,
  GetSendItemDetailResDto,
  GetSendListReqDto,
  GetSendListResDto,
  ReadInboxItemReqDto,
  ReadInboxItemResDto,
  ReplyInboxItemReqDto,
  ReplyInboxItemResDto,
  SocialMediaResDto,
} from "@tgs-web-nx/types";
import { ApiService } from "../api-services/services/ApiService";
import { GeneralService as PrevGeneralService } from "../api-services/services/GeneralService";

export const GeneralService = {
  ...PrevGeneralService,
  GetLocalization,
  GetInboxList,
  GetInboxItemDetail,
  GetSendList,
  GetSendItemDetail,
  ReplyInboxItem,
  ComposeInboxItem,
  ReadInboxItem,
  GetSocialMediaList,
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

function ReplyInboxItem({ letterId, content }: ReplyInboxItemReqDto) {
  return ApiService.put(`station-letter/${letterId}:reply`, {
    content,
  }) as unknown as Promise<ReplyInboxItemResDto>;
}

function ComposeInboxItem({ subject, content }: ComposeInboxItemReqDto) {
  return ApiService.put(`station-letter`, {
    subject,
    content,
  }) as unknown as Promise<ComposeInboxItemResDto>;
}

function ReadInboxItem({ letterId }: ReadInboxItemReqDto) {
  return ApiService.patch(
    `station-letter/${letterId}:read`,
  ) as unknown as Promise<ReadInboxItemResDto>;
}

function GetSocialMediaList() {
  return ApiService.get(`brand/social`) as unknown as Promise<SocialMediaResDto>;
}