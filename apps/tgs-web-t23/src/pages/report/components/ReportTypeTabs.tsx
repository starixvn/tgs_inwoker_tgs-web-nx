import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { useReportTypeTabs } from "@/core/components/Report/hooks/useReportTypeTabs";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import { Button } from "@mui/material";

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
              color: isSelected ? "black" : "white !important",
              border: isSelected ? "none" : "1px solid white",
              background: isSelected
                ? "linear-gradient(90deg, #FACE27 49.23%, #F3AF16 49.42%)"
                : "none",
              whiteSpace: {
                sx: "wrap",
                sm: "no-wrap",
              },
              padding: "16px",
              borderRadius: "30px",
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
