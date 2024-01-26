import React, { useMemo } from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import { FormikFormInput } from "@/hooks/stage/useFormikInitValue";
import iconUsername from "@/assets/t21/images/auth/icon-username.svg";
import iconPassword from "@/assets/t21/images/auth/icon-password.svg";
import iconEmail from "@/assets/t21/images/auth/icon-email.svg";
import iconPhone from "@/assets/t21/images/auth/icon-phone.svg";
import iconCode from "@/assets/t21/images/auth/icon-code.svg";
import iconPromoteCode from "@/assets/t21/images/auth/icon-promoteCode.svg";

const FormLabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5.57px;
  margin-bottom: 8.36px;
`;

const Label = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.primary};
`;

const iconDictionary: { [key in string]: string } = {
  username: iconUsername,
  pwd: iconPassword,
  password: iconPassword,
  confirmPassword: iconPassword,
  confirmPwd: iconPassword,
  code: iconCode,
  promoteCode: iconPromoteCode,
  email: iconEmail,
  phone: iconPhone,
};

type Props = {
  name: string;
  label: string;
};

const FormLabel = ({ name, label }: Props) => {
  const iconUrl = useMemo(() => {
    return iconDictionary[name];
  }, [name]);

  return (
    <FormLabelContainer>
      <Icon iconUrl={iconUrl} width={"18px"} height={"18px"} />

      <Label>{label}</Label>
    </FormLabelContainer>
  );
};

export default FormLabel;
