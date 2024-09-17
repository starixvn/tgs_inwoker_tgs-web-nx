import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { ProviderDto } from "@tgs-web-nx/types";
import { utility } from "@tgs-web-nx/utils";

import { ProviderItem } from "../HomeCategory/style";

const ProviderList: React.FC<{ providerList: ProviderDto[] }> = ({ providerList }) => {
  const { handleChangeGameType, handleChangeProvider } = useHomeGameContext();

  return providerList.map((provider, index) => {
    const providerName = provider.code.toLowerCase();

    const handleChange = (providerCode: string) => {
      handleChangeGameType(GameTypeEnum.ALL);
      handleChangeProvider(providerCode);
    };
    return (
      <div className="embla__slide " key={index}>
        <ProviderItem onClick={() => handleChange(provider.code)}>
          <img
            src={utility.imagePathGenerator(`provider/dark/${providerName}.webp`)}
            alt={providerName}
            title={providerName}
          />
        </ProviderItem>
      </div>
    );
  });
};
export default ProviderList;
