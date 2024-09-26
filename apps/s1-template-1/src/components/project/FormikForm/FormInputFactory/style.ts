import { TextField } from "@/components/UI/TextField";
import styled from "styled-components";

export const CustomTextField = styled(TextField)`
  &.username,
  &.password,
  &.email {
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

  &.email:before {
    top: 1.5rem;
    background: url("/assets/images/auth/icon-email.svg");
  }
`;
