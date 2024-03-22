import { useRef, ChangeEvent, useContext } from "react";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@tgs-web-nx/core/features";
import { DepositFormContext } from "./DepositFormProvider";
import {
  FormControl,
  ItemContainer,
  LabelContainer,
  Remark,
  UploadFileButton,
  UploadFileTag,
} from "@/components/styled-component/ProfileForms";

/**
 * 上傳憑證
 */
export const Upload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { alert } = useNotifications();
  const {formData, setFormData} = useContext(DepositFormContext);
  const {files} = formData;
  const handleOnClickFileButton = () => {
    inputRef?.current?.click();
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target?.files;
    const fileName = e.target.value.toLowerCase();
    
    if (files) {
      const fileSize = Math.round(files[0].size / 1024);

      if (
        !fileName.endsWith(".jpg") &&
        !fileName.endsWith(".jpeg") &&
        !fileName.endsWith(".png") &&
        !fileName.endsWith(".tiff")
      ) {
        alert("", i18n.t("deposit.msgInvalidFileType"));
        files = null;
        return;
      }
      
      if (fileSize > 10240) {
        alert("", i18n.t("deposit.msgInvalidFileSize"));
        files = null;
        return;
      }

      setFormData({...formData, files});
    }
  };

  return (
    <>
      <ItemContainer>
        <LabelContainer>{i18n.t("deposit.uploadReceipt")}</LabelContainer>

        <FormControl>
          <UploadFileButton
            onClick={handleOnClickFileButton}
            variant={"outlined"}
          >
            {i18n.t("common.upload")}
          </UploadFileButton>

          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept="image/jpg, image/jpeg, image/png, image/tiff"
            style={{ display: "none" }}
          />

          {files && <UploadFileTag>{files[0].name}</UploadFileTag>}
        </FormControl>
      </ItemContainer>
      <Remark>
        {i18n.t(
          config.features.Deposit_UploadRequired
            ? "deposit.msgPlsUploadProof"
            : "deposit.msgNotMustUploadProof",
        )}
      </Remark>
    </>
  );
}