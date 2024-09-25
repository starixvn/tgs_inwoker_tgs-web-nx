import { MilestoneType } from "@tgs-web-nx/types";
import { createContext, useState, ReactNode, useMemo } from "react";

type Props = {
  children: ReactNode;
};

type Colors = {
  titleColor: string;
  mainBg: string;
  bonusBg: string;
  indicatorBg: string;
};

export type contextType = {
  colors: Colors;
  setColors: (colors: Colors) => void;
  selectedMilestone: MilestoneType;
  setSelectedMilestone: (milestone: any) => void;
};

export const RewardContext = createContext<contextType | null>(null);

export const RewardContextProvider = ({ children }: Props) => {
  const [colors, setColors] = useState<Colors>({
    titleColor: "",
    mainBg: "",
    bonusBg: "",
    indicatorBg: "",
  });

  const [selectedMilestone, setSelectedMilestone] = useState({
    name: "",
    subSubject: "",
    totalValidBetAmount: 0,
    totalDepositAmount: 0,
    from: "",
    to: "",
    promotionId: "",
    conditions: [],
  });

  const contextValue = useMemo(
    () => ({ colors, setColors, selectedMilestone, setSelectedMilestone }),
    [colors, selectedMilestone],
  );

  return (
    <RewardContext.Provider value={contextValue as contextType}>{children}</RewardContext.Provider>
  );
};
