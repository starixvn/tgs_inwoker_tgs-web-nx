import { useGeneralStore } from "@tgs-web-nx/core";
import { useCallback, useState } from "react";

export enum InvitationTypeEnum {
  Agent = "a",
  Player = "p",
}

export function usePromotionCodeV2() {
  const { general, getInvitationCode } = useGeneralStore();
  const [invitationType, setInvitationType] = useState<InvitationTypeEnum | null>(null);
  const [promotionCode, setPromotionCode] = useState("");

  const initPromotionDataInLocalStorage = useCallback(() => {
    // url example: domain/a/invitationCode
    const [, invitationType, promotionCode] = window.location.pathname.split("/");

    if (
      invitationType === InvitationTypeEnum.Agent ||
      invitationType === InvitationTypeEnum.Player
    ) {
      localStorage.setItem("invitationType", invitationType);
      localStorage.setItem("promotionCode", promotionCode || "");
      return;
    }

    localStorage.setItem("invitationType", "");
    localStorage.setItem("promotionCode", "");
  }, []);

  const fetchInvitationCode = useCallback(async () => {
    try {
      const result = await getInvitationCode();

      if (!result.IsSuccess || !result.data.invitationCode) return;

      localStorage.setItem("invitationType", InvitationTypeEnum.Agent);
      localStorage.setItem("promotionCode", result.data.invitationCode || "");
    } catch (error) {
      console.error(error);
    }
  }, [getInvitationCode]);

  const initPromotionCode = useCallback(async () => {
    initPromotionDataInLocalStorage();

    if (general.brand.hasInvitationCode) {
      await fetchInvitationCode();
    }

    setInvitationType((localStorage.getItem("invitationType") as InvitationTypeEnum) || null);
    setPromotionCode(localStorage.getItem("promotionCode") || "");
  }, [fetchInvitationCode, general.brand.hasInvitationCode, initPromotionDataInLocalStorage]);

  const promotionData = {
    upper: invitationType === InvitationTypeEnum.Player ? promotionCode : "",
    promoId: invitationType === InvitationTypeEnum.Agent ? promotionCode : "",
  };

  return {
    promotionData,
    initPromotionCode,
    invitationType,
    promotionCode,
  };
}
