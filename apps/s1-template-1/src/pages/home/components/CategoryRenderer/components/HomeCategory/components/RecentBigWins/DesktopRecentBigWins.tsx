import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { styled as muiStyled } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { media } from "@tgs-web-nx/constants";
import { getFormatAmount } from "@tgs-web-nx/utils";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";

import { GameTypeTitle } from "../..";
import { BigWinsAmount, GameName } from "./MobileRecentBigWins";
import { theme } from "@/theme";

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;
`;

const CustomTab = muiStyled(Tab)(({ theme }) => ({
  color: theme.palette.tabColor,
  fontFamily: "inherit",
  fontSize: "1.4rem",
  fontWeight: "700",
  minHeight: "2.8rem",
  padding: "0 16px",
  "&.Mui-selected": {
    color: theme.palette.tabActiveColor,
  },
}));

const CustomTabPanel = muiStyled(TabPanel)(({ theme }) => ({
  padding: 0,
}));

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const CardHoverBg = styled.div`
  flex-shrink: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(6, 0, 74, 0.8);
  border-radius: 0.8rem;
  display: none;
  white-space: pre-line;

  &:hover {
    cursor: pointer;
  }
`;

const GameIcon = styled.div`
  position: relative;

  .icon {
    border-radius: 0.8rem !important;
  }

  ${media.sm} {
    flex-shrink: 0;

    &:hover {
      ${CardHoverBg} {
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

const PlayIcon = styled.img`
  width: 4.2rem;
  height: 4.2rem;
`;

const RecentBigWinsSlide = styled.div`
  --slide-size: 7.4rem;
`;

type BigWinType = {
  name: string;
  amount: number;
  code: string;
};

const DesktopRecentBigWins: React.FC<{ recentBigWins: BigWinType[] }> = ({ recentBigWins }) => {
  const [value, setValue] = useState("1");
  const [emblaAllRef] = useEmblaCarousel({ dragFree: true });
  const [emblaSlotsRef] = useEmblaCarousel({ dragFree: true });
  const [emblaLiveCasinoRef] = useEmblaCarousel({ dragFree: true });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const launchGameHandler = () => {
    // if (!isActive) {
    //   return;
    // }
    launchGame();
  };

  const launchGame = () => {
    // if (!isLogin) {
    //   history.push("/login");
    // } else {
    //   Common.closePreviousPopup();
    //   Common.PopupCenter(`/joingame/${gameItem.id}/${gameItem.gpcode}`, "gamewindow");
    // }
  };
  return (
    <TabContext value={value}>
      <Wrapper>
        <GameTypeTitle>
          <img src="/assets/images/common/icon-big-wins.svg" alt="hot" />
          {i18n.t("web.home.Section1RecentBigWins")}
        </GameTypeTitle>
        <Box sx={{ borderBottom: 1, borderColor: "divider", color: "#fff" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              minHeight: "2.8rem",
              ".MuiTabs-indicator": {
                height: "0.3rem",
                background: theme.tabActiveLineColor,
              },
            }}
          >
            <CustomTab label="All" value="1" />
            <CustomTab label="Slots" value="2" />
            <CustomTab label="Live Casino" value="3" />
          </TabList>
        </Box>
      </Wrapper>

      <CustomTabPanel value="1">
        <section className="embla">
          <div className="embla__viewport" ref={emblaAllRef}>
            <div className="embla__container">
              {recentBigWins &&
                recentBigWins.map((item, index) => {
                  return (
                    <RecentBigWinsSlide className="embla__slide" key={index}>
                      <GameContainer key={index}>
                        <GameIcon>
                          <img
                            className="icon"
                            src={`/assets/images/big-wins/desktop/${item.code}.png`}
                            alt={item.name}
                          />
                          <CardHoverBg onClick={launchGameHandler}>
                            <PlayIcon src="/assets/images/common/icon-play.svg" alt={"play"} />
                          </CardHoverBg>
                        </GameIcon>

                        <GameName>{item.name}</GameName>
                        <BigWinsAmount>{`đ${getFormatAmount(item.amount)}`}</BigWinsAmount>
                      </GameContainer>
                    </RecentBigWinsSlide>
                  );
                })}
            </div>
          </div>
        </section>
      </CustomTabPanel>
      <CustomTabPanel value="2">
        <section className="embla">
          <div className="embla__viewport" ref={emblaSlotsRef}>
            <div className="embla__container">
              {recentBigWins &&
                recentBigWins.map((item, index) => {
                  return (
                    <RecentBigWinsSlide className="embla__slide" key={index}>
                      <GameContainer key={index}></GameContainer>
                    </RecentBigWinsSlide>
                  );
                })}
            </div>
          </div>
        </section>
      </CustomTabPanel>
      <CustomTabPanel value="3">
        <section className="embla">
          <div className="embla__viewport" ref={emblaLiveCasinoRef}>
            <div className="embla__container">
              {recentBigWins &&
                recentBigWins.map((item, index) => {
                  return (
                    <RecentBigWinsSlide className="embla__slide" key={index}>
                      <GameContainer key={index}></GameContainer>
                    </RecentBigWinsSlide>
                  );
                })}
            </div>
          </div>
        </section>
      </CustomTabPanel>
    </TabContext>
  );
};

export default DesktopRecentBigWins;
