import { DepositSubmitButton, FormLayout, Form } from "./components";

/**
 * 存款表單
 */
const DepositForm = () => (
  <Form>
    {/* 對應UI */}
    <FormLayout />

    {/* 提交表單 */}
    <DepositSubmitButton />
  </Form>
);

export default DepositForm;
