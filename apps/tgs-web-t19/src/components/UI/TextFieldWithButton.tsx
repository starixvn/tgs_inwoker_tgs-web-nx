import React from "react";
import styled from "styled-components";
import { TextFieldProps } from "@mui/material";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { TextField } from "@/components/UI/TextField";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";

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
    height: 30px;
    font-size: 0.75rem;
    border-radius: 6px;
    padding: 8px;
    background: ${({ theme }) => theme.goldGradient};
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
  const { isMobileSize } = useRwd();
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
        sx={{ background: isMobileSize ? "transparent !important" : theme.pureBlack }}
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
