import { ArrowRightIcon } from "@/components/UI/CustomizeIcon";
import { i18n } from "@tgs-web-nx/utils";

import { ViewAll } from "../../style";

const ViewAllButton: React.FC<{ handleClick: () => void }> = ({ handleClick }) => {
  return (
    <ViewAll onClick={handleClick}>
      {i18n.t("common.all")}
      <ArrowRightIcon
        height={15}
        width={10}
        sx={{ width: "1rem", height: "1.5rem" }}
        viewBox="0 0 10 15"
      />
    </ViewAll>
  );
};

export default ViewAllButton;
