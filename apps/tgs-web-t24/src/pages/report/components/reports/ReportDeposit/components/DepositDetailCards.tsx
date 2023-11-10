import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import {
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
  ReportContainer,
} from "@/components/styled-component/Report";
import NoRecord from "@/pages/report/components/NoRecord";
import i18n from "@/utils/i18n";
import { Button } from "@/components/UI/Button";
import Loading from "@/components/UI/Loading";
import { DepositFormViewModel } from "@/core/types/dto/report/GetDepositDetailsResDto";

type Props = {
  transferDetails: DepositFormViewModel[];
};
const DepositDetailCards = ({ transferDetails }: Props) => {
  const history = useHistory();

  const handleManualDeposit = (id: string) => {
    history.push({
      pathname: "/manual/" + id,
    });
  };

  if (transferDetails.length <= 0) {
    return (
      <ReportContainer>
        <NoRecord />;
      </ReportContainer>
    );
  }
  return (
    <ReportContainer>
      <ReportCardsContainer>
        {transferDetails.map((depositDetail, index) => {
          const { createdon, orderno, status, id, amount, canuploadcerts } = depositDetail;
          const date = moment(createdon).format("YYYY-MM-DD hh:mm a");
          return (
            <ReportCard key={index}>
              <ReportCardRow>
                {i18n.t("report.NewOrderNumber")} : <ReportCardCol>{orderno}</ReportCardCol>
              </ReportCardRow>

              <ReportCardRow>
                <ReportCardCol>
                  <>{i18n.t(`report.deposit.status${status}`)}</>
                </ReportCardCol>

                <ReportCardCol>{amount}</ReportCardCol>

                <ReportCardCol style={{ marginLeft: "auto" }}>
                  {status === 1 && canuploadcerts && (
                    <Button
                      onClick={() => {
                        handleManualDeposit(id);
                      }}
                    >
                      <>{i18n.t("deposit.uploadReceipt")}</>
                    </Button>
                  )}
                </ReportCardCol>
              </ReportCardRow>

              <ReportCardRow>
                <ReportCardCol>{date}</ReportCardCol>
              </ReportCardRow>
            </ReportCard>
          );
        })}
      </ReportCardsContainer>
    </ReportContainer>
  );
};

export default DepositDetailCards;
