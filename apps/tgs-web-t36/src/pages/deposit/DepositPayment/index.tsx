import { useHistory, useLocation } from "react-router-dom";
import { getS88Pay } from "@tgs-web-nx/core";
import { useQuery } from "@tanstack/react-query";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useEffect } from "react";
import { AmountContainer, AmountTitle, Header, Logo, ScanContainer, ScanField, ScanFieldText, ScanTitle, DepositPaymentLayout, QrCode } from "./styled";
import {useCountdownTimer} from "./useCountdownTimer";
import { Button } from "@/components/UI/Button";

/**
 * 取得 URL query 字串
 * @returns query value
 */
function useSearchParams() {
  return new URLSearchParams(useLocation().search);
}

const DepositPayment = () => {
    const history = useHistory();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const {data} = useQuery({
        queryKey: ["s88pay"],
        queryFn: () => getS88Pay(id),
    });

    // 自製倒數計時
    const {isExpired, seconds} = useCountdownTimer(data?.data.expired);

    const i18nData = {
        paymentAmount: i18n.t("s88pay.paymentAmount"),
        scanToPay: i18n.t("s88pay.scanToPay"),
        remainingTime: i18n.t("s88pay.remainingTime"),
        accountNumber: i18n.t("s88pay.accountNumber"),
        bank: i18n.t("s88pay.bank"),
        accountName: i18n.t("s88pay.accountName"),
        recordingContent: i18n.t("s88pay.recordingContent"),
        warn: i18n.t("s88pay.warn"),
        notes: i18n.t("s88pay.notes"),
        list1: i18n.t("s88pay.list1").replace(/{matchCodeLength}/g, `${data?.data.payInfo?.matchCode?.length}` ?? ""),
        list2: i18n.t("s88pay.list2").replace(/{matchCodeLength}/g, `${data?.data.payInfo?.matchCode?.length}` ?? ""),
        list3: i18n.t("s88pay.list3"),
        list4: i18n.t("s88pay.list4").replace(/{matchCodeLength}/g, `${data?.data.payInfo?.matchCode?.length}` ?? ""),
        expired: i18n.t("s88pay.expired"),
        download: i18n.t("s88pay.download"),
    };

    const fields = [
        {
            title: i18nData.accountNumber,
            text: data?.data.payInfo?.account,
        },
        {
            title: i18nData.accountName,
            text: data?.data.payInfo?.accountName,
        },
        {
            title: i18nData.bank,
            text: data?.data.payInfo?.bankName,
        },
        {
            title: i18nData.recordingContent,
            text: data?.data.payInfo?.matchCode,
        },
    ]

    useEffect(() => {
        // 如果有錯誤 導回存款頁面
        if(data?.data.err) {
            history.push("/deposit");
        }
    }, [data?.data.err])

    return (
        <>
            <Header>
                <Logo 
                    src="/assets/images/deposit/s88pay.png"
                    alt="s88pay logo"
                />
            </Header>
            <AmountContainer>
                <AmountTitle>
                    {i18nData.paymentAmount}
                </AmountTitle>
                <AmountTitle $isRight>
                    {i18nData.remainingTime}
                </AmountTitle>
                <AmountTitle $isLarge>
                    {Common.formatCurrency(data?.data.amount ?? 0)}
                </AmountTitle>
                <AmountTitle $isLarge $isRight>
                    {seconds}
                </AmountTitle>
            </AmountContainer>
            <ScanContainer>
                <ScanTitle>
                    {i18nData.scanToPay}
                </ScanTitle>
                {
                    fields.map((field, i) => {
                        if(field.text) {
                            return (
                                <ScanField key={i}>
                                    <ScanFieldText>
                                        {field.title}
                                    </ScanFieldText>
                                    <ScanFieldText $hasMask>
                                        {field.text}
                                    </ScanFieldText>
                                </ScanField>
                        )}

                        return null;
                    })
                }
                {!isExpired ? <QrCode $bgUrl={data?.data.payInfo?.qr}/> : <p style={{color: "red"}}>{i18nData.expired}</p>}
                {!isExpired && <Button>
                    <a
                        style={{width: "100%", display: "block"}} 
                        href={data?.data.payInfo?.qr}
                        download
                    >
                        {i18nData.download}
                    </a>
                </Button>}
                <p>{i18nData.warn}</p>
                <ScanTitle>{i18nData.notes}</ScanTitle>
                <p>{i18nData.list1} ({data?.data.payInfo?.matchCode})</p>
                <p>{i18nData.list2} ({data?.data.payInfo?.matchCode})</p>
                <p>{i18nData.list3}</p>
                {data?.data.payInfo?.bankName && <p>{i18nData.list4} ({data?.data.payInfo?.matchCode})</p>}
                
            </ScanContainer>
        </>
    );
}

export {
    DepositPayment,
    DepositPaymentLayout
};