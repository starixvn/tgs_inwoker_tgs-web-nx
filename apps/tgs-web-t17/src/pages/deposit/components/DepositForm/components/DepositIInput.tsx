import { i18n } from "@tgs-web-nx/utils";
import { useContext, ChangeEvent } from "react";
import { DepositFormContext } from "@tgs-web-nx/core/hooks";
import { DepositFormState } from "@tgs-web-nx/types";
import {
  FormControl,
  ItemContainer,
  LabelContainer
} from "@/components/styled-component/ProfileForms";
import { TextField } from "@/components/UI/TextField";

type Props = {
  label: string;
  formKey: keyof DepositFormState;
  type?: string;
}

export const DepositInput = ({
  label,
  formKey,
  type = "text",
}: Props) => {
  const {formData, setFormData} = useContext(DepositFormContext);

  /**
   * 處理手動存款輸入欄位
   */
  const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [formKey]: e.target.value});
  };

    return (
      <ItemContainer style={{width: "100%"}}>

        {/* 標題 */}
        <LabelContainer>
          {i18n.t(label)}
        </LabelContainer>

        <FormControl variant="outlined">
          <TextField
            fullWidth
            value={formData[formKey]}
            onChange={handleOnInput}
            type={type}
            placeholder={i18n.t(label)}
          />
        </FormControl>

      </ItemContainer>
    )
}
