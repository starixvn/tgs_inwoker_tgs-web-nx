import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;
export const SubTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin: 2.4rem 0;
  color: ${({ theme }) => theme.text};
  text-align: center;
  letter-spacing: 0.4px;
  line-height: 3.2rem;
`;
export const SubTitleDesc = styled.div`
  font-size: 0.875rem;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;
export const ButtonContainer = styled.div`
  margin: 0 auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  padding-top: 1.2rem;
`;

export const SuccessImg = styled.div`
  display: flex;
  justify-content: center;
`;
