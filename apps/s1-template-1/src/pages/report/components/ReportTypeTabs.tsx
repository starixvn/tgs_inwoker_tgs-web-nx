import { ReportTabIndexEnum, useReportTypeTabs } from "@/components/account/Report/hooks/useReportTypeTabs";
import Badge from "@/pages/deposit/components/components/PaymentTabsHeader/Badge";
import React, { ChangeEvent } from "react";
import styled from "styled-components";

const ReportTypeTabsContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  width: 100%;
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
        if(index !== ReportTabIndexEnum.BETTING ) {
          return (
            <Badge
              text={label}
              key={index}
              handleClick={() => handleButtonClick(index)}
              isActive={isSelected}
            />
          );
        }
       
      })}
    </ReportTypeTabsContainer>
  );
};

export default ReportTypeTabs;
