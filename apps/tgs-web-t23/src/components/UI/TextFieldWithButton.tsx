import React from "react";
import styled from "styled-components";
import { TextFieldProps } from "@mui/material";
import { TextField } from "@/components/UI/TextField";
import { Button } from "@/components/UI/Button";

const CustomText = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: visible;
  & .MuiInputAdornment-root {
    overflow: visible;
    border-radius: 5px;
  }
`;

const ButtonContainer = styled.div`
  padding: 5px 20px 5px 0;
  /* margin-right: 20px; */

  & > button {
    height: 40px;
    font-size: 1rem;
    padding: 10px 8px;
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.tagColor};
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
        fullWidth={false}
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
