import { useRef, ChangeEvent, useContext } from "react";
import styled from 'styled-components';
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@tgs-web-nx/core/features";
import { DepositFormContext } from "./DepositFormProvider";
import {
  ItemContainer,
  LabelContainer,
  Remark,
  UploadFileButton,
  UploadFileTag,
} from "@/components/styled-component/ProfileForms";


const UploadTag = styled(UploadFileTag)`
  margin-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #D6DBDD;
`;

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
            style={{ opacity: 0, height: '1px', padding: 0 }} // for e2e test click
          />

          {files && <UploadTag>{files[0].name}</UploadTag>}
      </ItemContainer>
      {!files && <Remark>
        {i18n.t(
          config.features.Deposit_UploadRequired
            ? "deposit.msgPlsUploadProof"
            : "deposit.msgNotMustUploadProof",
        )}
      </Remark>}
    </>
  );
}