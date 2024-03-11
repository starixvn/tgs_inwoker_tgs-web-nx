import { i18n, Common } from "@tgs-web-nx/utils";
import { useGeneralStore } from "@tgs-web-nx/core";
import { ChangeEvent } from "react";
import { RenderLayer } from "./types";
import { LabelContainer, Badge, Form, Icon, FormContainer} from "./styled";
import { useDepositForm } from "./hooks";
import {
  FormControl,
  InfoContainer,
  ItemContainer,
  Remark,
  SubmitButton,
  UploadFileButton,
  UploadFileTag,
} from "@/components/styled-component/ProfileForms";
import { Select } from "@/components/UI/Select";
import { TextField } from "@/components/UI/TextField";

const DepositForm = () => {
  const { 
    layers,
    amount,
    promotion,
    filterPromotionList,
    transferlimit,
    handleOnSelectPromotion,
    handleOnChangeAmount,
    handleOnSubmit,
  } = useDepositForm();
  const [maxAmount, minAmount] = [transferlimit?.to ?? 0, transferlimit?.from  ?? 0];
  const isDisabled = Common.validateDepositAndWithdrawAmount(amount, maxAmount, minAmount);
  
  /**
   * 渲染存款表單選項
   */
  const renderLayer: RenderLayer = (config, key) => {
      const {i18nParam, list} = config;

      return (
        <FormContainer label={i18n.t(i18nParam)} key={key}>
          {list.map((row, index) => 
              <Badge
                key={index}
                onClick={()=> row.onClick(row.code)}
                $isActive={row.isActive}
              >   
                <Icon src={row.iconUrl} />
                {row.children}
              </Badge>
            )}
        </FormContainer>
      );
  };
  

  return (
    <Form>
      {layers.map((layer, i) => renderLayer(layer, i))}

      {/*請輸入存款金額*/}
      <ItemContainer>
        <LabelContainer>{i18n.t("deposit.depositAmount")}</LabelContainer>
        <FormControl variant="outlined">
          <TextField
            fullWidth
            value={amount}
            onChange={handleOnChangeAmount}
            type="tel"
            placeholder={
              i18n.t("deposit.msgPleaseEnter") +
              Common.formatCurrency(minAmount) +
              " - " +
              Common.formatCurrency(maxAmount) +
              i18n.t("deposit.dollor")
            }
          />
        </FormControl>
      </ItemContainer>
      
      
      {/*優惠活動*/}
      <ItemContainer>
        <LabelContainer>{i18n.t("deposit.promotion")}</LabelContainer>
        <FormControl variant="outlined">
          <Select
            native
            id="customSelect"
            value={promotion}
            onChange={(e) => handleOnSelectPromotion(e)}
          >
            <option value="">{i18n.t("deposit.msgPlsSelectPromotion")}</option>
            {filterPromotionList.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                );
              })}
          </Select>
        </FormControl>
      </ItemContainer>



      {/*提交*/}
      <SubmitButton
        onClick={handleOnSubmit}
        variant="contained"
        color="primary"
        fullWidth
        disabled={isDisabled}
      >
          {i18n.t("common.submit")}
      </SubmitButton>
    </Form>
  );
};

export default DepositForm;


 