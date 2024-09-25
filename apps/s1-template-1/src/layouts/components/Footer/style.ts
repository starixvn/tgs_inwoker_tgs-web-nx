import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

export const FooterContainer = styled.div`
  background: ${({ theme }) => theme.footerBackground};
`;

export const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0.8rem;

  ${media.sm} {
    padding-top: 1.6rem;
    padding-bottom: 2.4rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap-column: 2rem;
  }

  ${media.md} {
    margin: 0 auto;
    grid-template-columns: repeat(4, 1fr);
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
  }
`;

export const FooterBottom = styled.div`
  background-color: ${({ theme }) => theme.footerBottomBg};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FooterGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.sm} {
    align-items: flex-start;
  }

  ${media.lg} {
    align-items: flex-start;
  }
`;

export const GroupTitle = styled.h6`
  position: relative;
  display: flex;
  margin-bottom: 1rem;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.4rem;
`;

export const PaymentMethod = styled.div`
  display: flex;
  height: 4.8rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  background: #242b34;
  padding: 0.8rem;

  img {
    max-width: 100%;
  }
`;

export const GroupContent = styled.div`
  gap: 1.2rem;
  font-size: 1.3rem;
  line-height: 2.4rem;
  font-weight: 500;
  margin: 1.2rem 0 2.4rem;
  color: ${({ theme }) => theme.footerColor};

  &.payment-method-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;

    ${media.sm} {
      grid-template-columns: repeat(2, 10rem);
    }

    ${media.md} {
      grid-template-columns: repeat(2, 9rem);
    }

    ${media.lg} {
      grid-template-columns: repeat(2, 10rem);
    }

    ${media.xl} {
      grid-template-columns: repeat(3, 10rem);
    }
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-top: 0.4rem;
`;

export const LinkContent = styled(GroupContent)`
  flex-direction: column;
  gap: 0.8rem;
`;

export const FooterLogo = styled.div`
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: center;
`;

export const Link = styled.div`
  width: 100%;
  cursor: pointer;
  margin-bottom: 0.8rem;
  text-align: center;

  ${media.sm} {
    text-align: left;
  }

  &:hover {
    color: ${({ theme }) => theme.linkColor};
  }
`;
