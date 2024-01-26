import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { BankCard } from "@tgs-web-nx/types";
import { useShowAddCardButton } from "@tgs-web-nx/core/features";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { SubmitButton } from "@/components/styled-component/ProfileForms";
import Card from "@/pages/withdrawal/components/CardManage/Card";
import { CardContainer } from "@/components/styled-component/WithdrawV2/CardManage";
import CardAddCard from "@/pages/withdrawal/components/CardManage/CardAddCard";
import FormTitle from "@/pages/withdrawal/components/Main/FormTitle";

const CardManageContainer = styled.div`
  width: 100%;
  padding: 0 18px;
`;

type Props = {
  bankCardList: BankCard[];
  onhandleDeleteCardClick: (id: string) => void;
  onhandleAddCardClick: () => void;
  onhandleBackClick: () => void;
};

const CardManage = ({
  bankCardList,
  onhandleDeleteCardClick,
  onhandleAddCardClick,
  onhandleBackClick,
}: Props) => {
  const { isDesktopSize } = useRwd();
  const { isShowAddCardButton } = useShowAddCardButton(bankCardList);
  const { isCustomizedBrand } = useHomeGameContext();

  const getCardContent = (item: BankCard): string => {
    if (item.detail.phone) {
      return item.detail.phone.substring(item.detail.phone.length - 4);
    }

    if (item.detail.address) {
      return item.detail.address.substring(item.detail.address.length - 4);
    }

    if (
      item.banktype === "ThirdParty" ||
      item.banktype === "Coinsph" ||
      item.banktype === "FPS" ||
      item.banktype === "Pulsa" ||
      item.banktype === "EWallet"
    ) {
      // For bank types "ThirdParty", "Coinsph", "FPS", "Pulsa", and "EWallet"
      return "";
    }

    if (item.detail.bankAccount) {
      return item.detail.bankAccount.substring(item.detail.bankAccount.length - 4);
    }

    return "";
  };

  return (
    <CardManageContainer>
      <FormTitle
        title={i18n.t("card.title")}
        isCustomizedBrand={isCustomizedBrand}
        isShowAddCardButton={isShowAddCardButton}
        handleClickAddCard={onhandleAddCardClick}
      />

      <CardContainer>
        {bankCardList.map((item, key) => {
          return (
            <Card
              key={item.id}
              title={item.banktype}
              content={getCardContent(item)}
              handleDelete={() => onhandleDeleteCardClick(item.id)}
              disable={
                config.features.AddCard_NotAllowedEditDelete ||
                config.features.ChangesNotAllowed ||
                config.features.AddCard_DisableCreateUpdateDelete ||
                //@ts-ignore
                config.features.DisableRemoveCard
              }
              isCustomizedBrand={isCustomizedBrand}
            />
          );
        })}

        {!isDesktopSize && isShowAddCardButton && (
          <CardAddCard handleClick={onhandleAddCardClick} />
        )}
      </CardContainer>

      <SubmitButton fullWidth onClick={onhandleBackClick}>
        {i18n.t("common.back")}
      </SubmitButton>
    </CardManageContainer>
  );
};

export default CardManage;
