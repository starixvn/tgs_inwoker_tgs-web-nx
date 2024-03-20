import { i18n } from "@tgs-web-nx/utils";
import { useState } from "react";
import { Badge, Icon, FormContainer} from "../components";
import { Option } from "../types";

type Props = {
  i18nParam: string,
  list: Option[],
  hasIcon?: boolean,
}

const defaultIconUrl = './assets/images/deposit/default.png';

const Image = ({
  iconUrl
}: {iconUrl: string}) => {
  const [isError, setIsError] = useState(false);
  return <Icon src={isError ? defaultIconUrl : iconUrl} onError={() => setIsError(true)}/>
}


/**
 * 選項卡片
 */
export const Cards = ({
  i18nParam,
  list,
  hasIcon = false,
}: Props) => {
  return (
    <FormContainer label={i18n.t(i18nParam)}>
      {list.map((row, index) => 
          <Badge
            key={index}
            onClick={()=> row.onClick(row.code)}
            $isActive={row.isActive}
          >   
            {hasIcon && <Image iconUrl={row.iconUrl}/>}
            {row.children}
          </Badge>
        )}
    </FormContainer>
  );
}
