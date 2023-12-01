import React from "react";
import RegisterFormV1 from "@/pages/register/components/RegisterForm/RegisterFormV1";
import RegisterFormV2 from "@/pages/register/components/RegisterForm/RegisterFormV2";

const REGISTER_VERSION = "V1";
const RegisterForm = () => {
  return REGISTER_VERSION === "V2" ? <RegisterFormV2 /> : <RegisterFormV1 />;
};

export default React.memo(RegisterForm);
