import Icon from "@/components/project/Icon";
import {
  ButtonContainer,
  Container,
  SubTitle, SuccessImg
} from "@/components/styled-component/WithdrawV2/AddCardSuccess";
import { GreenGradientButton, LightBlueGradientButton } from "@/components/UI/Button";
import { theme } from "@/theme";
import config from "@tgs-web-nx/config";
import { useShowAddCardButton } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";

const AddCardSuccess = ({
  isDeposit,
  bankCardList,
  onhandleBindCardClick,
  onhandleGoWithdrawClick,
  onhandleGoDepositClick,
  onhandleCSClick,
}) => {
  const { isShowAddCardButton } = useShowAddCardButton(bankCardList);

  return (
    <Container>
      <SuccessImg>
        <Icon iconUrl="/assets/images/transfer/icon-successful.svg" width={"138px"} height={"138px"} />
      </SuccessImg>

      <SubTitle>{i18n.t("card.success.title")}</SubTitle>
      {/* {isShowAddCardButton ? (
        <SubTitleDesc>
          {i18n.t("card.success.successDesc")}
          <br></br>
          {i18n.t("card.success.bindDesc")}
        </SubTitleDesc>
      ) : (
        <SubTitleDesc>{i18n.t("card.success.noMoreAddCard")}</SubTitleDesc>
      )} */}

      <ButtonContainer>
        {!(
          config.features.ChangesNotAllowed ||
          config.features.AddCard_NotAllowedEditDelete ||
          bankCardList.length >= config.features.AddCard_MaximumCardAllowed
        ) && (
          <LightBlueGradientButton
            fullWidth
            onClick={onhandleBindCardClick}            
          >
            {i18n.t("card.success.bindBankCard")}
          </LightBlueGradientButton>
        )}
        <GreenGradientButton
          fullWidth
          onClick={isDeposit ? onhandleGoDepositClick : onhandleGoWithdrawClick}
          style={{
            background: theme.blue30,
          }}
        >
          {isDeposit ? i18n.t("card.success.goDeposit") : i18n.t("card.success.goWithdrawal")}
        </GreenGradientButton>
      </ButtonContainer>
    </Container>
  );
};

export default AddCardSuccess;
