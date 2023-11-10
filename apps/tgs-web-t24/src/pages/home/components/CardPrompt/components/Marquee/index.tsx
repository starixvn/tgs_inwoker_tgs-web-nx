import styled from "styled-components";
import notification from "@/assets/t24/images/home/notification.svg";
import { useUiStore } from "@/core/stores/useUiStore";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  padding: 4px 0 4px 10px;
  font-size: 0.875rem;
  background-color: ${({ theme }) => theme.gray80};
  color: ${({ theme }) => theme.white};
  margin-right: 10px;
  gap: 7px;
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

  return (
    <Container>
      <img src={notification} alt="marquee" />
      {hasData && (
        // Disable TypeScript check for unknown HTML elements
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <marquee>
          {marquees.map((item, index) => {
            const content = `
              *${item.localization !== null && item.localization.content
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
