import { i18n } from "@tgs-web-nx/utils";
import { Option } from "@tgs-web-nx/types";
import { useState } from "react";
import { Badge, Icon, FormContainer} from "../components";

type Props = {
  i18nParam: string,
  list: Option[],
}

const defaultIconUrl = './assets/images/deposit/default.webp';

const CardIcon = ({
  iconUrl
}: {iconUrl: string}) => {
  const [isError, setIsError] = useState(false);
  return (
    <Icon src={isError ? defaultIconUrl : iconUrl} onError={() => setIsError(true)}/>
  );
}


/**
 * 選項卡片
 */
export const Cards = ({
  i18nParam,
  list,
}: Props) => {
  return (
    <FormContainer label={i18n.t(i18nParam)}>
      {list.map((row, index) =>
          <Badge
            key={index}
            onClick={()=> row.onClick(row.code)}
            $isActive={row.isActive}
          >
            {row.iconUrl && <CardIcon iconUrl={row.iconUrl}/>}
            {row.children}
          </Badge>
        )}
    </FormContainer>
  );
}
