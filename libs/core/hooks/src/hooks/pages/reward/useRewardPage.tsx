import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { createContext, useState, ReactNode, useMemo } from "react";
import { i18n } from "@tgs-web-nx/utils";

type Props = {
  children: ReactNode;
};

type Colors = {
  titleColor: string;
  subTitleColor: string;
  mainBg: string;
  bonusBg: string;
  indicatorBg: string;
};

export type contextType = {
  colors: Colors;
  setColors: (colors: Colors) => void;
  selectedMilestone: any;
  setSelectedMilestone: (milestone: any) => void;
};

export const RewardContext = createContext<contextType | null>(null);

export const RewardContextProvider = ({ children }: Props) => {
  const [colors, setColors] = useState<Colors>({
    titleColor: "",
    subTitleColor: "",
    mainBg: "",
    bonusBg: "",
    indicatorBg: "",
  });
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const contextValue = useMemo(
    () => ({ colors, setColors, selectedMilestone, setSelectedMilestone }),
    [colors, selectedMilestone],
  );

  return (
    <RewardContext.Provider value={contextValue as contextType}>{children}</RewardContext.Provider>
  );
};

export function useRewardPage() {
  useUpdatePageName(i18n.t("common.Milestone"));
}
