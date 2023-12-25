import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useReportTypeTabs } from "@/components/account/Report/hooks/useReportTypeTabs";
import { theme } from "@/theme";

const ReportTypeTabsContainer = styled.div`
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
`;

type Props = {
  selectedType: number;
  handleChangeTab: (e: ChangeEvent, newValue: number) => void;
} & React.HTMLProps<any>;

const ReportTypeTabs = ({ selectedType, handleChangeTab, ...others }: Props) => {
  const { displayedTabList } = useReportTypeTabs();

  const handleButtonClick = (newIndex: number) => {
    handleChangeTab({} as ChangeEvent, newIndex);
  };

  return (
    //@ts-ignore
    <ReportTypeTabsContainer {...others}>
      {displayedTabList.map((reportTab) => {
        const { index, label } = reportTab;
        const isSelected = index === selectedType;
        return (
          <Button
            key={index}
            onClick={() => handleButtonClick(index)}
            sx={{
              color: {
                xs: `${isSelected ? theme.white : theme["dae3"]} !important`,
                sm: `${isSelected ? theme.white : theme.text} !important`,
              },
              background: {
                xs: `${isSelected ? theme.greenGradient : theme.darkBlue} !important`,
                sm: `${isSelected ? theme.main : theme["dae3"]} !important`,
              },
              border: {
                xs: `1px solid transparent`,
                sm: `1px solid ${isSelected ? theme.blue : theme.main} !important`,
              },
              whiteSpace: {
                xs: "wrap",
                sm: "no-wrap",
              },
              padding: "12px",
              borderRadius: {
                xs: "4px",
                sm: "3px",
              },
              width: {
                xs: "calc((100% - 2 * 9px) / 3)",
                sm: "auto",
              },
              minWidth: {
                sm: "calc((100% - 5 * 9px) / 6)",
              },
            }}
          >
            {label}
          </Button>
        );
      })}
    </ReportTypeTabsContainer>
  );
};

export default ReportTypeTabs;
