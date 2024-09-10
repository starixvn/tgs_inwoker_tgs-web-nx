import MuiTextField from "@/components/UI/TextField";
import styled from "styled-components";

export const CustomTextField = styled(MuiTextField)`
  height: 4.8rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.formInputBorder} !important;
  background: ${({ theme }) => theme.formInputBackground};

  .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-notchedOutline:focus {
    border: none;
  }

  .MuiInputBase-input {
    font-size: 1.4rem;
    font-weight: 700;
  }

  .MuiInputBase-input::placeholder {
    font-size: 1.4rem;
    font-weight: 700;
    color: #55657e;
    opacity: 1;
  }

  &.username,
  &.password {
    padding-left: 2.4rem;

    &:before {
      content: "";
      position: absolute;
      left: 1.2rem;
      top: 1.4rem;
      width: 1.8rem;
      height: 1.8rem;
    }
  }

  &.username:before {
    background: url("/assets/images/auth/icon-user.svg");
  }

  &.password:before {
    background: url("/assets/images/auth/icon-password.svg");
  }
`;
