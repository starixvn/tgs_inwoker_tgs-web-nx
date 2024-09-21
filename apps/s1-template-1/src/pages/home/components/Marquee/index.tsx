import { media } from "@/theme/breakpoints";
import { DESKTOP_ANNOUNCEMENT_HEIGHT, MAIN_CONTENT_MAX_WIDTH, MOBILE_ANNOUNCEMENT_HEIGHT } from "@/theme/constants";
import { useUiStore } from "@tgs-web-nx/core";
import styled from "styled-components";

const MarqueeContainer = styled.div`
  position: relative;
  overflow: visible;
  height: ${MOBILE_ANNOUNCEMENT_HEIGHT};
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  padding: 0 0.8rem;
  color: ${({ theme }) => theme.announceTextColor};
  flex-shrink: 0;

  ${media.sm} {
    height: ${DESKTOP_ANNOUNCEMENT_HEIGHT};
    background: transparent;
  }

  marquee {
    margin-left: 0.4rem;
  }
`;

const MarqueeContent = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;

  ${media.lg} {
    margin: 0 auto;
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
  }
`;

const MarqueesBackground = styled.div`
  display: inline;
  overflow: visible;
`;

const Marquee = () => {
  const {
    ui: { marquees },
  } = useUiStore();
  const hasData = marquees && marquees.length > 0;

  if (!hasData) {
    return <></>;
  }

  return (
    <MarqueeContainer className="marquee-container">
      <MarqueeContent>
        <img
          className="icon"
          src="/assets/images/common/icon-announcement.png"
          alt="announcement"
          height={21}
          width={22}
        />
        {
          // Disable TypeScript check for unknown HTML elements
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line jsx-a11y/no-distracting-elements
          <marquee>
            {marquees.map((item, index) => {
              const content = `${
                item.localization !== null && item.localization.content
                  ? item.localization.content
                  : item.content
              }
`;
              return <MarqueesBackground key={index}>{content}</MarqueesBackground>;
            })}
            {/*@ts-ignore*/}
          </marquee>
        }
      </MarqueeContent>
    </MarqueeContainer>
  );
};

export default Marquee;
