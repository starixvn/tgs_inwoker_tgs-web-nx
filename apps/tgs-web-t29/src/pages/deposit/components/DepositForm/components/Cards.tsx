import { i18n } from "@tgs-web-nx/utils";
import { Badge, Icon, FormContainer} from "../components";
import { Option } from "../types";

type Props = {
  i18nParam: string,
  list: Option[],
}

/**
 * 選項卡片
 */
export const Cards = ({
  i18nParam,
  list
}: Props) => (
  <FormContainer label={i18n.t(i18nParam)}>
    {list.map((row, index) => 
        <Badge
          key={index}
          onClick={()=> row.onClick(row.code)}
          $isActive={row.isActive}
        >   
          <Icon src={row.iconUrl} />
          {row.children}
        </Badge>
      )}
  </FormContainer>
);
