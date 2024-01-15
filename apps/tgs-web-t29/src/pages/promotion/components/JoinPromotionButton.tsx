import { useSnackbar } from "notistack";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { REDIRECT_PROMOTION_TYPE } from "@tgs-web-nx/constants";
import Loading from "@/components/UI/Loading";
import { media } from "@/theme/breakpoints";
import { SubmitButton } from "@/components/styled-component/ProfileForms";

const StyledButton = styled(SubmitButton)`
  width: 100%;
  height: 100%;
  padding: 12px 20px 12px 20px;
  border-radius: 12px;
  gap: 10px;
  font-size: 1.25rem;
  font-weight: 500;
  cursor: pointer;

  ${media.sm} {
    height: 46px;
    max-width: 870px;
    padding-top: 10px;
  }
`;

const JoinPromotionButton = ({ id, promotionType }: { id: string; promotionType: string }) => {
  const { joinPromotion } = useGeneralStore();
  const { enqueueSnackbar } = useSnackbar();
  const {
    account: { token },
  } = useAccountStore();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [hasJoined, setHasjoined] = useState(false);

  const handleJoinPromotion = async () => {
    if (token === null) {
      history.push("/login");
      return;
    }

    if (REDIRECT_PROMOTION_TYPE.indexOf(promotionType) >= 0) {
      history.push({
        pathname: "/deposit/" + id,
      });
      return;
    }

    setLoading(true);
    const joinPromotionResDto = await joinPromotion(id);
    setLoading(false);

    if (!joinPromotionResDto?.data) {
      console.error("something went wrong in joinPromotion", joinPromotionResDto);
      return;
    }

    if (joinPromotionResDto.data.success) {
      enqueueSnackbar(i18n.t("promotion.joinSuccess") as string, {
        variant: "success",
      });
      setHasjoined(true);
      return;
    }

    if (joinPromotionResDto.data.err === 0) {
      enqueueSnackbar(i18n.t("promotion.promoJoint") as string, {
        variant: "success",
      });
    }
  };

  if (loading) return <Loading show={true} />;

  return (
    <StyledButton onClick={handleJoinPromotion} disabled={hasJoined}>
      {i18n.t("T13.promo.join")}
    </StyledButton>
  );
};

export default JoinPromotionButton;
