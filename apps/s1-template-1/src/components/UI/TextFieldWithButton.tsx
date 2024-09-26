import { DarkBlueGradientButton } from "@/components/UI/Button";
import { TextField } from "@/components/UI/TextField";
import { TextFieldProps } from "@mui/material";
import React from "react";
import styled from "styled-components";

const CustomText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  overflow: visible;
  gap: 0.8rem;

  & .MuiInputAdornment-root {
    overflow: visible;
    border-radius: 5px;
  }
`;

const ButtonContainer = styled.div`
  flex-shrink: 0;

  & > button {
    padding: 0 1.6rem;
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
        <DarkBlueGradientButton onClick={props.onClick} disabled={!!props.buttonDisabled}>
          {props.buttonLabel}
        </DarkBlueGradientButton>
      </ButtonContainer>
    </CustomText>
  );
};

export default TextFieldWithButton;
