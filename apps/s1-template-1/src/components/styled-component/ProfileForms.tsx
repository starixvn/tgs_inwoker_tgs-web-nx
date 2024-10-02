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
  margin-bottom: 2.4rem;
`;

export const ItemContainerSmall = styled(ItemContainer)`
  margin-bottom: 1.6rem;
`;

export const LabelContainer = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  float: left;
  margin-bottom: 0.8rem;
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
  top: -0.2rem;
`;

export const ItemNoteDesc = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  margin-left: 0.4rem;
`;

export const AccountInfoWrapper = styled.div`
  ${media.sm} {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1.2rem;
  }
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
  background: ${({ theme }) => theme.formInputBackground};
`;

export const InfoContainer = styled.div`
  width: 100%;
  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  position: relative;
  padding-top: 1rem;
  ${media.sm} {
    display: flex;
    align-items: flex-end;
    padding-top: 0;
  }
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
  },
})) as typeof MuiButton;

export const UploadFileTag = styled.span`
  width: 100%;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.formInputColor};

  display: flex;
  align-items: center;
  height: 4.8rem;
  font-weight: 700;
  background: ${({ theme }) => theme.formInputBackground};
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.formInputBorder};
  padding-left: 1.2rem;
`;

export const AccountIcon = styled.div`
  cursor: pointer;
  margin: 0 0 0 0.6rem;
  border-radius: 50%;
  border: 0.2rem solid rgba(255, 255, 255, 0.2);
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &.user-wallet {
    width: 6.8rem;
    height: 6.8rem;
    margin: 0;
  }

  ${media.sm} {
    margin: 0 0.8rem 0 0.6rem;
  }

  img {
    width: 100%;
    max-width: 100%;
  }
`;

export const BadgeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1.2rem;
  grid-row-gap: 1.2rem;
  ${media.sm} {
    display: flex;
    gap: 1.2rem;
    flex-wrap: wrap;
  }
`;

export const LabelHighlight = styled.div`
  color: ${({ theme }) => theme.textHighlight};
`;

export const SubmitButton = muiStyled(MuiButton)(({ theme }) => ({
  height: "4.8rem",
  whiteSpace: "nowrap",
  padding: "1.6rem",
  marginBottom: "2.4rem",
  fontSize: "1.4rem",
  fontFamily: "var(--main-font-family)",
  textTransform: "capitalize",
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
    background: theme.palette.header.signUp.disabledBackground,
    color: theme.palette.header.signUp.disabledColor,
  },
})) as typeof MuiButton;

export const VerifySubmitButton = styled(SubmitButton)`
  margin-bottom: 20px !important;
`;
