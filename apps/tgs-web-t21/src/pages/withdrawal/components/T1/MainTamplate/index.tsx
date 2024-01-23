import React from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { BankCard } from "@tgs-web-nx/types";
import MainDesktop from "./MainDesktop";
import MainMobile from "./MainMobile";
import WithdrawPaper from "@/components/project/WithdrawPaper";

export type MainProps = {
  cardList: BankCard[];
} & {
  [key in string]: any;
};
const Main = (mainProps: MainProps) => {
  const { isDesktopSize } = useRwd();

  //@ts-ignore
  return isDesktopSize ? (
    <MainDesktop {...mainProps} />
  ) : (
    <WithdrawPaper>
      <MainMobile {...mainProps} />
    </WithdrawPaper>
  );
};

export default Main;
