import styled from "styled-components";
import { useUiStore } from "@tgs-web-nx/core";
import notification from "@/assets/t25/images/home/notification.svg";
import Icon from "@/components/project/Icon";

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
  color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 6px;
`;

const Background = styled.div`
  display: inline;
  overflow: visible;
`;

const IconContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: ${({ theme }) => theme.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Marquee = () => {
  const {
    ui: { marquees },
  } = useUiStore();

  const hasData = marquees && marquees.length > 0;

  return (
    <Container>
      <IconContainer>
        <Icon iconUrl={notification} width={"18px"} height={"18px"} />
      </IconContainer>
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
