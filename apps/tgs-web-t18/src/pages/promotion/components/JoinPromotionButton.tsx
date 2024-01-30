import { useSnackbar } from "notistack";
import { useState } from "react";
import { AppHistory, useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { REDIRECT_PROMOTION_TYPE } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import { media } from "@/theme/breakpoints";
import Loading from "@/components/UI/Loading";

const Button = styled.button<{ $disabled: boolean }>`
  border: none;
  width: 100%;
  height: 100%;
  padding: 12px 20px 12px 20px;
  border-radius: 12px;
  gap: 10px;
  background: ${({ theme }) => theme.secondary};
  color: #ffffff;
  font-size: 1.25rem;
  cursor: pointer;
  background-image: ${({ $disabled }) => {
    return $disabled
      ? `
    opacity: 0.65;
    background-color: grey;
    cursor: not-allowed;`
      : ``;
  }};
  ${media.sm} {
    font-size: 2rem;
    max-width: 360px;
    max-height: 75px;
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
      enqueueSnackbar(i18n.t("promotion.joinFail") as string, {
        variant: "success",
      });
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
    <Button onClick={handleJoinPromotion} $disabled={hasJoined}>
      Claim Bonus
    </Button>
  );
};

export default JoinPromotionButton;
