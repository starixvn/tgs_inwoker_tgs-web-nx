import { ApiService } from "../api-services/services/ApiService";

type UbpayDto = {
    "err": number,
    "errmsg": string,
    "errmsgid": string,
    "data": {
      "rate": number
    }
}

type S88PayDto = {
    data: {
        err?: number,
        errmsg?: string,
        errmsgid: string,
        formId?: string,
        amount?: number,
        expired?: string,
        payInfo?: {
            matchCode: string,
            qr: string,
            account: string,
            accountName: string,
            bankName: string,
        }
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

export const getS88Pay = (tokenId: string | null) => {
    if(tokenId) {
        return ApiService.get(`deposit/s88pay/pay-data/${tokenId}`) as unknown as Promise<S88PayDto>
    }
}