import { FormikFormInput } from "@tgs-web-nx/core/features";

export type Props = {
  formInput: FormikFormInput;
  formik: any;
  showErrorOn?: "bottom" | "input";
};
