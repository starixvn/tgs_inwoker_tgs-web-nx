import { useLocation } from "react-router-dom";
import { AmountContainer, AmountTitle, Header, Logo, ScanContainer, ScanField, ScanFieldText, ScanTitle, DepositPaymentLayout, QrCode } from "./styled";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DepositPayment = () => {
    const query = useQuery();
  
    // 获取查询参数
    const id = query.get('id');
    const fields = [
        {
            title: "Account Number",
            text: "dkhdio730902",
        },
        {
            title: "Account Name",
            text: "dkhdio730902",
        },
        {
            title: "Recording Content (Important)",
            text: "dkhdio730902",
        },
    ]


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
                    Payment Amount
                </AmountTitle>
                <AmountTitle $isRight>
                    Remaining Time
                </AmountTitle>
                <AmountTitle $isLarge>
                    VND 50,000.00
                </AmountTitle>
                <AmountTitle $isLarge $isRight>
                    10
                </AmountTitle>
            </AmountContainer>
            <ScanContainer>
                <ScanTitle>
                    Scan to Pay
                </ScanTitle>
                {
                    fields.map((field, i) => (
                        <ScanField key={i}>
                            <ScanFieldText>
                                {field.title}
                            </ScanFieldText>
                            <ScanFieldText $hasMask>
                                {field.text}
                            </ScanFieldText>
                        </ScanField>
                    ))
                }
                <QrCode />
                <p>
                This QR code is a one-time use code and is only valid for this transaction. If you use it for multiple payments causing any loss, the company will not be responsible.
                </p>
                <ScanTitle>
                    Notes
                </ScanTitle>
                <p>
                    1.In order for your funds to be updated quickly, please enter the 6-digit code shown above correctly.
                </p>
                <p>
                    2.Do not enter any other letters or characters beyond the available 6 characters.
                </p>
                <p>
                    3.The amount cannot be changed.
                </p>
            </ScanContainer>
        </>
    );
}

export {
    DepositPayment,
    DepositPaymentLayout
};