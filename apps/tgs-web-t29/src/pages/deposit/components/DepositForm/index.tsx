import { DepositAmountInput, DepositPromotion, DepositSubmitButton, FormLayout, Form } from "./components";

/**
 * 存款表單
 */
const DepositForm = () => (
  <Form>
    {/* 對應UI */}
    <FormLayout />

    {/* 請輸入存款金額 */}
    <DepositAmountInput />
    
    {/* 選擇優惠活動 */}
    <DepositPromotion />

    {/* 提交表單 */}
    <DepositSubmitButton />
  </Form>
);

export default DepositForm;
