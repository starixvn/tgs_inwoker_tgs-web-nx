import styled from "styled-components";
import { useUiStore } from "@tgs-web-nx/core";
import iconBell from "@/assets/t34/images/header/bell.svg";

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
  border-radius: 5px;
  font-size: 0.875rem;
`;

const Background = styled.div`
  display: inline;
  overflow: visible;
  font-size: 1rem;
  font-weight: 700;
`;

const Marquee = () => {
  const {
    ui: { marquees },
  } = useUiStore();

  const hasData = marquees && marquees.length > 0;

  return (
    <Container>
      <img src={iconBell} alt="marquee" style={{ marginRight: "8.42px" }} />
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
