import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import PopupAnnouncement from "@/components/project/Popup/PopupAnnouncement";
import Loading from "@/components/UI/Loading";

const WithdrawalForm = ({
  openAnnouncement,
  loading,
  handleCloseAnnouncement,
  switchDisplayView,
}) => {
  return (
    <>
      {switchDisplayView()}

      <PopupAnnouncement
        open={openAnnouncement}
        onClose={() => {
          handleCloseAnnouncement();
        }}
        text={i18n.t("card.toEdit")}
      />
      <Loading show={loading} />
    </>
  );
};

export default WithdrawalForm;
