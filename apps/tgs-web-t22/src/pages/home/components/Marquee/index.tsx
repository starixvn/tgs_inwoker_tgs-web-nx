import { useUiStore } from "@tgs-web-nx/core";
import styled from "styled-components";
import notification from "@/assets/t29/images/home/notify.svg";

const MarqueeContainer = styled.div`
  position: relative;
  overflow: visible;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  font-size: 0.875rem;
  padding: 10px;
  color: ${({ theme }) => theme.white};
  background: #000000b2;
`;

const MarqueeContent = styled.div`
  display: flex;
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
  return (
    <MarqueeContainer>
      <MarqueeContent>
        <img src={notification} alt="marquee" />
              {hasData && (
                // Disable TypeScript check for unknown HTML elements
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <marquee>
                  {marquees.map((item, index) => {
                    const content = `
          *${
            item.localization !== null && item.localization.content
              ? item.localization.content
              : item.content
          }
          `;
                    return <MarqueesBackground key={index}>{content}</MarqueesBackground>;
                  })}
                  {/*@ts-ignore*/}
                </marquee>
              )}
      </MarqueeContent>
    </MarqueeContainer>
  );
}

export default Marquee;