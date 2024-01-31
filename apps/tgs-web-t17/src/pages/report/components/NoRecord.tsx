import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import noResultImg from "@/assets/t18/images/report/no_result.svg";

const NoRecordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  width: 100px;
`;

const NoRecordContainer = styled.div`
  width: 53px;
  height: 53px;
  margin-bottom: 8px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NoDataText = styled.div`
  font-size: 1.062rem;
  font-weight: 700;
  color: ${({ theme }) => theme.lightGray};
`;

const NoRecord = () => {
  return (
    <NoRecordWrapper>
      <NoRecordContainer>
        <img src={noResultImg} alt={"no-result"} />
      </NoRecordContainer>
      <NoDataText>{i18n.t("common.nodata")}</NoDataText>
    </NoRecordWrapper>
  );
};

export default React.memo(NoRecord);
