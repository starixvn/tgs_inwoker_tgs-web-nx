import { media } from "@/theme/breakpoints";
import { Button as MuiButton, FormControl as MuiFormControl, styled as muiStyled } from "@mui/material";
import styled from "styled-components";

export const Remark = styled.div`
  font-size: 0.937rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  margin-bottom: 24px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  ${media.sm} {
    max-width: 500px;
  }
`;

export const LabelContainer = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  float: left;
  margin-bottom: .8rem;
  letter-spacing: 0.28px;
`;

export const LabelLargeContainer = styled(LabelContainer)`
  font-size: 1.6rem;
  margin-bottom: 1.6rem;
  letter-spacing: 0.32px;
  float: unset;
`;

export const ItemNote = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.noteTextColor};
  line-height: 1.8rem;
`;
export const ItemNoteText = styled.span`
  position: relative; 
  top: -.2rem;
`;

export const ItemNoteDesc = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  margin-left: .4rem;
`;

export const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  width: "100%",
  fontSize: "0.875rem",
  // borderBottom: `1px solid ${theme.palette.gray10}`,
  justifyContent: "center",

  "& fieldset": {
    border: "none",
  },

  "& input": {
    padding: "10px 0",
  },
})) as typeof MuiFormControl;

export const UploadFileControl = styled.div`
  padding: 0 1.2rem;
  height: 4.8rem;
  line-height: 48rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.formInputBorder};
  position: relative;
`;

export const InfoContainer = styled.div`
  width: 100%;
  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  position: relative;
  padding-top: 1rem;
`;

export const UploadFileButton = muiStyled(MuiButton)(({ theme }) => ({
  fontSize: "1.2rem",
  backgroundColor: "#272E37",
  padding: ".5rem 1.2rem .4rem",
  color: `${theme.palette.text.primary}`,
  border: "none",
  position: "absolute",
  right: "1.2rem",
  top: ".8rem",
  borderRadius: ".8rem",
  "&:hover": {
    border: "none",
    backgroundColor: "#272E37",
  }
})) as typeof MuiButton;

export const UploadFileTag = styled.span`
  width: 100%;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.formInputColor};

  display: flex;
  align-items: center;
  height: 4.8rem;
  font-weight: 700;
`;

export const SubmitButton = muiStyled(MuiButton)(({ theme }) => ({
  height: "4.8rem",
  whiteSpace: "nowrap",
  padding: "1.6rem",
  marginBottom: "2.4rem",
  fontSize: "1.4rem",
  lineHeight: 1,
  fontWeight: 700,
  color: theme.palette.submitButton.color,
  background: theme.palette.submitButton.background,
  boxShadow: theme.palette.submitButton.shadow,
  borderRadius: "1rem",

  "&:hover": {
    background: theme.palette.submitButton.background,
  },

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
})) as typeof MuiButton;

export const VerifySubmitButton = styled(SubmitButton)`
  margin-bottom: 20px !important;
`;
