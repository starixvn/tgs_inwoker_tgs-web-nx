import { useHistory } from "react-router-dom";
import React, { useCallback } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import styled from "styled-components";
import { useMediaQuery, useTheme } from "@mui/material";
import i18n from "@/core/utils/i18n";
import { media } from "@/theme/breakpoints";
import depositIcon from "@/assets/t18/images/header/deposit_icon.svg";
import Icon from "@/components/project/Icon";
import { useRwd } from "@/core/hooks/tools/useRwd";

const DepositButtonContainer = styled.div`
  background: linear-gradient(180deg, #922acf 0%, #2f26ad 100%);
  border-radius: 5px;
  width: 39px;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.318rem;

  ${media.sm} {
    width: auto;
    padding: 8.5px 12px;
  }
`;

const DepositButton = () => {
  const history = useHistory();
  const { isSmSize } = useRwd();

  const handleClick = useCallback(() => {
    history.push("/deposit");
  }, []);
  return (
    <DepositButtonContainer>
      {isSmSize ? (
        <>
          <Icon
            iconUrl={depositIcon}
            width={"17px"}
            height={"16px"}
            style={{
              marginRight: "5px",
            }}
          />
          {i18n.t("common.deposit")}
        </>
      ) : (
        <AddIcon onClick={handleClick} />
      )}
    </DepositButtonContainer>
  );
};

export default DepositButton;
