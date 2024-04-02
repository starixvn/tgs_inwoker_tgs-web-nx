import styled from "styled-components";
import { TextFieldProps } from "@mui/material";
import { TextField } from "@/components/UI/TextField";
import { Button } from "@/components/UI/Button";

const CustomText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  overflow: visible;
  & .MuiInputAdornment-root {
    overflow: visible;
    border-radius: 5px;
  }
`;

const ButtonContainer = styled.div`
  flex-shrink: 0;
  & > button {
    height: 31px;
    font-size: 0.75rem;
    padding: 6px 8px;
    background: #399fda;
    color: #fff;
    margin-right: 5px;
  }
`;

const TextFieldWithButton = (
  props: TextFieldProps & {
    label?: string;
    onClick: () => void;
    maxLength?: number;
    buttonLabel?: string;
    buttonDisabled?: boolean;
  },
) => {
  return (
    <CustomText>
      <TextField
        type={props.type ? props.type : "text"}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled || false}
        placeholder={props.placeholder || ""}
        fullWidth={true}
        inputProps={{
          autoComplete: "off",
        }}

        // endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
      />

      <ButtonContainer>
        <Button onClick={props.onClick} disabled={!!props.buttonDisabled}>
          {props.buttonLabel}
        </Button>
      </ButtonContainer>
    </CustomText>
  );
};

export default TextFieldWithButton;
