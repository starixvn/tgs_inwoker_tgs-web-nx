import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Button } from "@/components/UI/Button";
import i18n from "@/utils/i18n";
import { theme } from "@/theme";

const AffiliateInfoRowContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.mainLightBackground};
  border-radius: 30px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & .label {
    min-width: 110px;
    margin-right: 8px;
    font-weight: 400;
    font-size: 1.125rem;
    line-height: 1.318rem;
    color: ${({ theme }) => theme.white};
  }

  & .value {
    font-weight: 400;
    font-size: 0.937rem;
    line-height: 1.098rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 6px;
  }

  & .button {
    //justify-self: flex-end;
    margin-left: auto;
    font-size: 0.75rem;
    font-weight: 400;
    padding: 8px 19px;
    border-radius: 5px;
  }
`;

type Props = {
  label: string;
  value: string;
};
const AffiliateInfoRow = ({ label, value }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyText = useCallback(() => {
    if (isCopied) return;

    navigator.clipboard.writeText(value);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [value]);

  return (
    <AffiliateInfoRowContainer>
      <span className={"label"}>{label}</span>
      <span className={"value"}>{value}</span>
      <Button
        className={"button"}
        onClick={handleCopyText}
        variant={isCopied ? "outlined" : "contained"}
        sx={{
          width: "66px",
          color: "black",
          background: theme.primary,
        }}
      >
        {isCopied ? i18n.t("affiliate.copied") : i18n.t("common.copy")}
      </Button>
    </AffiliateInfoRowContainer>
  );
};

export default AffiliateInfoRow;
