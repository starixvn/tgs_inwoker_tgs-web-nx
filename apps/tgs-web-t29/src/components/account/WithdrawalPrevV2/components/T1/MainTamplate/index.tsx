import React from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import MainDesktop from "@/components/account/WithdrawalPrevV2/components/T1/MainTamplate/MainDesktop";
import MainMobile from "@/components/account/WithdrawalPrevV2/components/T1/MainTamplate/MainMobile";

export type MainProps = any;
const Main = (mainProps: MainProps) => {
  const { isDesktopSize } = useRwd();

  //@ts-ignore
  return isDesktopSize ? <MainDesktop {...mainProps} /> : <MainMobile {...mainProps} />;
};

export default Main;
