import { getFormInputType } from "@/components/project/FormikForm/utils/getFormInputType";

import { CustomTextField } from "./style";
import { Props } from "./type";

const FormText = ({ formInput, formik, showErrorOn }: Props) => {
  const { label, name, type } = formInput;

  return (
    <CustomTextField
      variant="outlined"
      type={getFormInputType(type)}
      placeholder={label}
      fullWidth
      name={name}
      className={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      helperText={showErrorOn === "input" && formik.touched[name] && formik.errors[name]}
      error={showErrorOn === "input" && !!formik.touched[name] && !!formik.errors[name]}
      inputProps={{
        autoComplete: "off",
      }}
    />
  );
};

export default FormText;
