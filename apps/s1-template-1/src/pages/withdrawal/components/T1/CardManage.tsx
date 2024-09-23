import { LabelContainer } from "@/components/styled-component/ProfileForms";
import { CardContainer } from "@/components/styled-component/WithdrawV2/CardManage";
import { DarkBlueGradientButton } from "@/components/UI/Button";
import Card from "@/pages/withdrawal/components/CardManage/Card";
import CardAddCard from "@/pages/withdrawal/components/CardManage/CardAddCard";
import config from "@tgs-web-nx/config";
import { useWalletStore } from "@tgs-web-nx/core";
import { useShowAddCardButton } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { BankCard } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const CardManageContainer = styled.div`
  width: 100%;
`;

const CardContainerTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .8rem;
`;

const CardContainerHeader = styled.div`
  background-color: ${({ theme }) => theme.tableHeaderBackground};
  height: 3.6rem;

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
  const { wallet } = useWalletStore();
  const { isDesktopSize } = useRwd();
  const { isShowAddCardButton } = useShowAddCardButton(bankCardList);

  console.log("WHAT THE HAIL")
  console.log(wallet.withdrawalList);

  const getCardContent = (item: BankCard): string => {
    if (item.detail.phone) {
      return item.detail.phone;
    }

    if (item.detail.address) {
      return item.detail.address;
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
      return item.detail.bankAccount;
    }

    return "";
  };

  const getChannelCode = (bankType: string, paymentChannelId: string) => {
    const channels = wallet.withdrawalList.find(item => item.banktype === bankType)?.channel;
    const code = channels?.find(item => item.channelid === paymentChannelId);
    return code?.channelcode ?? "Unknown";
  }

  const getBankName = (item: BankCard): string => {
    return item.detail.bankName;
  };
  return (
    <CardManageContainer>
      {/* {isDesktopSize && (
        <FormTitle
          title={i18n.t("card.title")}
          isShowAddCardButton={isShowAddCardButton}
          handleClickAddCard={onhandleAddCardClick}
        />
      )} */}
      <CardContainerTitle>
        <LabelContainer>Manage Bank Accounts</LabelContainer>
        {isShowAddCardButton && (
            <CardAddCard handleClick={onhandleAddCardClick} />
          )}
      </CardContainerTitle>

      <CardContainer>
          <Card title={"Type"} content={"Account Number"} contentName={"Brand"} handleDelete={() => {}} isHeader={true} disable={true} />

        {bankCardList.map((item, key) => {
          return (
            <Card
              key={item.id}
              title={item.banktype}
              content={getCardContent(item)}
              contentName={getChannelCode(item.banktype, item.paymentchannelid)}
              handleDelete={() => onhandleDeleteCardClick(item.id)}
              disable={
                config.features.AddCard_NotAllowedEditDelete ||
                config.features.ChangesNotAllowed ||
                config.features.AddCard_DisableCreateUpdateDelete ||
                //@ts-ignore
                config.features.DisableRemoveCard
              }
              isHeader={false}
            />
          );
        })}
      </CardContainer>

      <DarkBlueGradientButton fullWidth onClick={onhandleBackClick}>
        {i18n.t("common.back")}
      </DarkBlueGradientButton>
    </CardManageContainer>
  );
};

export default CardManage;
