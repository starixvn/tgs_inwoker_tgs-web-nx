import React from "react";
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
    height: 40px;
    font-size: 0.75rem;
    border-radius: 50px;
    padding: 8px;
    background: ${({ theme }) => theme.secondary};
  }
`;

const SendButton = styled(Button)`
  background-color: ${({ theme }) => `${theme.accountLableText} !important`};
  border-radius: 4px !important;
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
        style={{ marginRight: "8px" }}
      // endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
      />

      <ButtonContainer>
        <SendButton onClick={props.onClick} disabled={!!props.buttonDisabled}>
          {props.buttonLabel}
        </SendButton>
      </ButtonContainer>
    </CustomText>
  );
};

export default TextFieldWithButton;
