import { ApiService } from "../api-services/services/ApiService";

type UbpayDto = {
    "err": number,
    "errmsg": string,
    "errmsgid": string,
    "data": {
      "rate": number
    }
}

/**
 * 取得玩家細節
 * @param payload PlayerDetailConfig
 * @returns  
 */
export const getUbpayRate = (
    brandPaymentId?: string
) => {
    if(brandPaymentId) {
        const apiUrl = `deposit/crypto/ubpay/exchangerate/${brandPaymentId}`;
        return ApiService.get(apiUrl) as unknown as Promise<UbpayDto>
    }
}