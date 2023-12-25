import React, { useCallback } from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import Icon from "@/components/project/Icon";
import returnIcon from "@/assets/t30/images/promotion/icon-return.svg";
import { MOBILE_HEADER_HEIGHT } from "@/theme/constants";

export const DETAIL_HEADER_HEIGHT = "50px";

const DetailHeaderContainer = styled.div`
  width: 100%;
  height: ${DETAIL_HEADER_HEIGHT};
  display: flex;
  align-items: center;
  position: fixed;
  top: ${MOBILE_HEADER_HEIGHT};
  background: ${({ theme }) => theme.mainLightBackground};
`;

const DetailHeaderTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.white};
`;

const DetailHeader = () => {
  const history = useHistory();
  const handleReturn = () => {
    history.push("/promotion-list");
  };

  return (
    <DetailHeaderContainer>
      <Icon
        iconUrl={returnIcon}
        width={"50px"}
        height={"50px"}
        onClick={handleReturn}
        style={{
          cursor: "pointer",
        }}
      />
      <DetailHeaderTitle>{i18n.t("common.promotion")}</DetailHeaderTitle>
    </DetailHeaderContainer>
  );
};

export default DetailHeader;
