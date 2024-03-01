import { useGeneralStore } from "@tgs-web-nx/core";
import { useCallback } from "react";

export enum InvitationTypeEnum {
  Agent = "a",
  Player = "p",
}

export function usePromotionCodeV2() {
  const { getInvitationCode } = useGeneralStore();

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

  const initPromotionCode = async (hasInvitationCode: boolean) => {
    initPromotionDataInLocalStorage();

    if (hasInvitationCode) {
      await fetchInvitationCode();
    }
  };

  const getInvitationType = () => {
    return (localStorage.getItem("invitationType") as InvitationTypeEnum) || null;
  };

  const getPromotionCode = () => {
    return localStorage.getItem("promotionCode") || "";
  };

  return {
    initPromotionCode,
    getInvitationType,
    getPromotionCode,
  };
}
