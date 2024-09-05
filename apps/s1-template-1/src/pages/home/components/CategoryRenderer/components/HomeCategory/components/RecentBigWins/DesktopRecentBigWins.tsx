import { theme } from "@/theme";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { styled as muiStyled } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { getFormatAmount } from "@tgs-web-nx/utils";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";
import styled from "styled-components";

import { GameTypeTitle } from "../..";
import { BigWinsAmount, GameName } from "./MobileRecentBigWins";

const Row = styled.div`
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

const GameIcon = styled.img`
  border-radius: 0.8rem;
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

  return (
    <TabContext value={value}>
      <Wrapper>
        <GameTypeTitle>
          <img src="/assets/images/common/icon-big-wins.svg" alt="hot" />
          Recent Big Wins
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
                      <Row key={index}>
                        <GameIcon
                          src={`/assets/images/big-wins/desktop/${item.code}.png`}
                          alt={item.name}
                        />
                        <GameName>{item.name}</GameName>
                        <BigWinsAmount>{`đ${getFormatAmount(item.amount)}`}</BigWinsAmount>
                      </Row>
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
                      <Row key={index}>
                        <GameIcon
                          src={`/assets/images/big-wins/desktop/${item.code}.png`}
                          alt={item.name}
                        />
                        <GameName>{item.name}</GameName>
                        <BigWinsAmount>{`đ${getFormatAmount(item.amount)}`}</BigWinsAmount>
                      </Row>
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
                      <Row key={index}>
                        <GameIcon
                          src={`/assets/images/big-wins/desktop/${item.code}.png`}
                          alt={item.name}
                        />
                        <GameName>{item.name}</GameName>
                        <BigWinsAmount>{`đ${getFormatAmount(item.amount)}`}</BigWinsAmount>
                      </Row>
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
