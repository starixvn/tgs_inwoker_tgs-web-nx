import styled from "styled-components";
import { useUiStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import notification from "@/assets/t31/images/home/notifications.svg";
import notificationDesktop from "@/assets/t29/images/home/notifications.svg";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  white-space: nowrap;
  word-break: keep-all;
  font-size: 0.875rem;
  padding: 4px 10px;
  color: ${({ theme }) => theme.text};
`;

const Background = styled.div`
  display: inline;
  overflow: visible;
`;

const Marquee = () => {
  const {
    ui: { marquees },
  } = useUiStore();

  const hasData = marquees && marquees.length > 0;
  const { isDesktopSize } = useRwd();

  return (
    <Container>
      <img src={isDesktopSize ? notificationDesktop : notification} alt="marquee" />
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
            return <Background key={index}>{content}</Background>;
          })}
          {/*@ts-ignore*/}
        </marquee>
      )}
    </Container>
  );
};

export default Marquee;
