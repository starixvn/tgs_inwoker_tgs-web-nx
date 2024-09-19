import { GameTypeEnum, media } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { ProviderDto } from "@tgs-web-nx/types";
import { utility } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const ProviderItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.providerItemBackground};
  min-width: 11.3rem;
  height: 6rem;
  padding: 0 0.8rem;
  border-radius: 1rem;

  ${media.sm} {
    &:hover {
      cursor: pointer;
    }
  }

  > img {
    max-width: 100%;
  }
`;

const ProviderList: React.FC<{ providerList: ProviderDto[] }> = ({ providerList }) => {
  const history = useHistory();
  const { handleChangeGameType} = useHomeGameContext();

  return providerList.map((provider, index) => {
    const providerName = provider.code.toLowerCase();

    const navigateTo = (pageName: string) => {
      handleChangeGameType(GameTypeEnum.ALL);
      history.push("/providers/" + pageName);
      window.scroll({ top: 0, behavior: "smooth" });
    };

    return (
      <div className="embla__slide " key={index}>
        <ProviderItem onClick={() => navigateTo(provider.route)}>
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
