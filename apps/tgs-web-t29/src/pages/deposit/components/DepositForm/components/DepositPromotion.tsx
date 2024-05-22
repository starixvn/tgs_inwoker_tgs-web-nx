import { i18n } from "@tgs-web-nx/utils";
import { useContext } from "react";
import { useGeneralStore } from "@tgs-web-nx/core";
import { SelectChangeEvent } from "@mui/material";
import { DepositFormContext } from "@tgs-web-nx/core/hooks";
import { DepositPromotionEnum } from "@tgs-web-nx/types";
import { LabelContainer } from "../components";
import { FormControl, ItemContainer } from "@/components/styled-component/ProfileForms";
import { Select } from "@/components/UI/Select";


/**
 * 存款優惠活動 UI
 */
export const DepositPromotion = () => {
  const {formData, setFormData} = useContext(DepositFormContext);
  const {general: { promotionList }} = useGeneralStore();
  
  const filterPromotionList = promotionList.items.filter((row) => {
    if(row.promotionType === DepositPromotionEnum.DepositReward) {
      return Number(formData.amount) >= row.campaignDetail.depositMinimumLimit
    }
    
    return !!DepositPromotionEnum[row.promotionType as DepositPromotionEnum]
  });

  /**
   * 選擇優惠
   */
  const handleOnSelectPromotion = (e: SelectChangeEvent<any>) => {
    setFormData({...formData, promotionid: e.target.value});
  }

  return (
    <ItemContainer>
      <LabelContainer>{i18n.t("deposit.promotion")}</LabelContainer>
      <FormControl variant="outlined">
        <Select
          native
          id="customSelect"
          value={formData.promotionid}
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
  );
};