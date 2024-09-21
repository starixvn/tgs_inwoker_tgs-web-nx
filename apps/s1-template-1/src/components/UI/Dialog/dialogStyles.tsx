import styled from "styled-components";

export const DialogContainer = styled.div`
  padding: 3.2rem 3.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

export const DialogTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 20px;
`;
export const DialogContent = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.28px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

// TODO: depecrated
export const ButtonConfirm = styled.div`
  width: 50%;
  height: 90px;
  border-radius: 20px;
  font-size: 34px;
  text-align: center;
  padding-top: 24px;
  margin: 10px auto;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
`;

export const TwoButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;

  & > * {
    flex: 1;
  }
`;
