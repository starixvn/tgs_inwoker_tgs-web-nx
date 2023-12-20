import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useReportTypeTabs } from "@/components/account/Report/hooks/useReportTypeTabs";
import { theme } from "@/theme";

const ReportTypeTabsContainer = styled.div`
  display: flex;
  gap: 12px;
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
              color: isSelected ? theme.pureBlack : theme.white,
              background: isSelected ? theme.goldGradient : "transparent",
              border: isSelected ? "transparent" : `1px solid ${theme.white}`,
              "&:hover": {
                color: isSelected ? theme.pureBlack : theme.white,
                background: isSelected ? theme.goldGradient : "transparent",
              },
              whiteSpace: {
                sx: "wrap",
                sm: "no-wrap",
              },
              padding: "0px 12px",
              borderRadius: "6px",
              fontSize: "20px",
              fontWeight: 400,
              height: {
                sm: "50px",
              },
              width: {
                xs: "calc((100% - 2 * 20px) / 3)",
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
