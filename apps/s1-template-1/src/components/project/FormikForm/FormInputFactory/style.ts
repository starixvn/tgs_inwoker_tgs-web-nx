import MuiTextField from "@/components/UI/TextField";
import styled from "styled-components";

export const CustomTextField = styled(MuiTextField)`
  height: 4.8rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.formInputBorder};
  background: ${({ theme }) => theme.formInputBackground};

  &:focus {
    outline: none;
  }
`;
