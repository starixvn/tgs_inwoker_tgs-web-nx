import { i18n, Common } from "@tgs-web-nx/utils";
import { BadgeWrapper, LabelContainer, Badge, Form, Icon} from "./styled";
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
    channelCode, 
    channelId, 
    depositChannelList, 
    filterList,
    amount,
    handleOnChangeChannelCode, 
    handleOnChangeChannelId,
    handleOnChangeAmount,
    handleOnSubmit,
    transferlimit,
  } = useDepositForm();

  const [maxAmount, minAmount] = [transferlimit?.to ?? 0, transferlimit?.from  ?? 0];
  const isDisabled = Common.validateDepositAndWithdrawAmount(amount, maxAmount, minAmount);

  return (
    <Form>
      {/* 類別 */}
      <ItemContainer>
        <LabelContainer>{i18n.t("depositAndWithdrawalStatus.depositMode")}</LabelContainer>
        <BadgeWrapper>
          {depositChannelList.map((row, index) => 
            <Badge
              key={index}
              onClick={()=> handleOnChangeChannelCode(row.channelCode)}
              $isActive={row.channelCode === channelCode}
            >   
              <Icon src="/assets/images/deposit/momo.png" />
              {row.channelCode}
            </Badge>
          )}
        </BadgeWrapper>
      </ItemContainer> 
      
      {/* 渠道 */}
      <ItemContainer>
        <LabelContainer>{i18n.t("depositAndWithdrawalStatus.channel")}</LabelContainer>
        <BadgeWrapper>
          {filterList.map((channel, index) => 
            <Badge
              key={index}
              onClick={()=> handleOnChangeChannelId(channel.id)}
              $isActive={channel.id === channelId}
            >   <Icon src="/assets/images/deposit/momo.webp" />
                {channel.channelname}
            </Badge>
          )}
        </BadgeWrapper>
      </ItemContainer>

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
      {/* <ItemContainer>
          <LabelContainer>{i18n.t("deposit.promotion")}</LabelContainer>
          <FormControl variant="outlined">
            <Select
              native
              id="customSelect"
              value={this.props.depositPromotion}
              onChange={(e) => this.props.handlePromotionChange(e)}
            >
              <option value="">{i18n.t("deposit.msgPlsSelectPromotion")}</option>
              {this.props.general.promotionList.items
                .filter(
                  (item) =>
                    [
                      "FirstDeposit",
                      "DailySecondDeposit",
                      "DailyFirstDeposit",
                      "DepositReward",
                      "DepositAccumulateRoulette",
                    ].indexOf(item.promotionType) >= 0 &&
                    (item.promotionType === "DepositReward"
                      ? this.props.amount >= item.campaignDetail.depositMinimumLimit
                      : true),
                )
                .map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
      </ItemContainer> */}

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
