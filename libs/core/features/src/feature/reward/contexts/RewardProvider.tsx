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
  expandPromotions: string[];
  changeExpandedPromotions: (promotionId: string) => void;
  colors: Colors;
  setColors: (colors: Colors) => void;
  selectedMilestone: MilestoneType;
  setSelectedMilestone: (milestone: MilestoneType) => void;
};

export const RewardContext = createContext<contextType | null>(null);

export const RewardContextProvider = ({ children }: Props) => {
  const [colors, setColors] = useState<Colors>({
    titleColor: "",
    mainBg: "",
    bonusBg: "",
    indicatorBg: "",
  });

  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneType>({
    name: "",
    subSubject: "",
    totalValidBetAmount: 0,
    totalDepositAmount: 0,
    from: "",
    to: "",
    promotionId: "",
    conditions: [],
  });

  const [expandPromotions, setExpandedPromotions] = useState<string[]>([]);

  const changeExpandedPromotions = (promotionId: string) => {
    setExpandedPromotions((prevState: string[]) => {
      if (prevState.includes(promotionId)) {
        return prevState.filter((id: string) => id !== promotionId);
      } else {
        return [...prevState, promotionId];
      }
    });
  };

  const contextValue = useMemo(
    () => ({
      colors,
      setColors,
      selectedMilestone,
      setSelectedMilestone,
      expandPromotions,
      changeExpandedPromotions,
    }),
    [colors, selectedMilestone, expandPromotions],
  );

  return (
    <RewardContext.Provider value={contextValue as contextType}>{children}</RewardContext.Provider>
  );
};
