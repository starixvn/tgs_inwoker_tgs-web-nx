import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { BankCard } from "@tgs-web-nx/types";
import { SubmitButton } from "@/components/styled-component/ProfileForms";
import Card from "@/pages/withdrawal/components/CardManage/Card";
import { CardContainer } from "@/components/styled-component/WithdrawV2/CardManage";
import CardAddCard from "@/pages/withdrawal/components/CardManage/CardAddCard";
import FormTitle from "@/components/account/WithdrawalPrevV2/components/T1/MainTamplate/components/FormTitle";

const CardManageContainer = styled.div`
  width: 100%;
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

  const {
    AddCard_NotAllowedEditDelete,
    ChangesNotAllowed,
    AddCard_MaximumCardAllowed,
    AddCard_DisableCreateUpdateDelete,
  } = config.features;

  const isShowAddCardButton = !(
    AddCard_NotAllowedEditDelete ||
    ChangesNotAllowed ||
    (bankCardList.length >= AddCard_MaximumCardAllowed && AddCard_DisableCreateUpdateDelete)
  );

  return (
    <CardManageContainer>
      {isDesktopSize && (
        <FormTitle title={i18n.t("card.title")} handleClickAddCard={onhandleAddCardClick} />
      )}

      <CardContainer>
        {bankCardList.map((item, key) => {
          return (
            <Card
              key={item.id}
              title={item.banktype}
              content={(() => {
                if (
                  item.banktype === "ThirdParty" ||
                  item.banktype === "Coinsph" ||
                  item.banktype === "FPS"
                ) {
                  if (item.detail.phone) {
                    return item.detail.phone.substring(
                      item.detail.phone.length - 4,
                      item.detail.phone.length,
                    );
                  } else if (item.detail.address) {
                    return item.detail.address.substring(
                      item.detail.address.length - 4,
                      item.detail.address.length,
                    );
                  }
                } else if (item.banktype === "Pulsa" || item.banktype === "EWallet") {
                  if (item.detail.phone) {
                    return item.detail.phone.substring(
                      item.detail.phone.length - 4,
                      item.detail.phone.length,
                    );
                  } else if (item.detail.address) {
                    return item.detail.address.substring(
                      item.detail.address.length - 4,
                      item.detail.address.length,
                    );
                  }
                } else {
                  if (item.detail.bankAccount) {
                    return item.detail.bankAccount.substring(
                      item.detail.bankAccount.length - 4,
                      item.detail.bankAccount.length,
                    );
                  } else if (item.detail.address) {
                    return item.detail.address.substring(
                      item.detail.address.length - 4,
                      item.detail.address.length,
                    );
                  }
                }
              })()}
              handleDelete={() => onhandleDeleteCardClick(item.id)}
              disable={
                config.features.AddCard_NotAllowedEditDelete ||
                config.features.ChangesNotAllowed ||
                config.features.AddCard_DisableCreateUpdateDelete ||
                config.features.DisableRemoveCard
              }
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
