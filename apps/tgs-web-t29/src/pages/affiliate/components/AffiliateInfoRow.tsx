import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";

const AffiliateInfoRowContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.mainBackground};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.gray10};

  & .label {
    min-width: 110px;
    margin-right: 8px;
    font-weight: 400;
    font-size: 1.125rem;
    line-height: 1.318rem;
    color: ${({ theme }) => theme.gray50};
  }

  & .value {
    font-weight: 400;
    font-size: 0.937rem;
    line-height: 1.098rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 6px;
    color: ${({ theme }) => theme.black};
  }

  & .button {
    //justify-self: flex-end;
    margin-left: auto;
    font-size: 0.75rem;
    font-weight: 400;
    padding: 8px 15px;
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
          color: theme.white,
          background: theme.secondary,
          fontSize: "0.75rem",
        }}
      >
        {isCopied ? i18n.t("affiliate.copied") : i18n.t("common.copy")}
      </Button>
    </AffiliateInfoRowContainer>
  );
};

export default AffiliateInfoRow;
