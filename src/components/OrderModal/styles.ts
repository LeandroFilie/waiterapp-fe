import styled, { css } from 'styled-components';

interface ButtonProps {
  variant: 'primary' | 'secondary';
}

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBody = styled.div`
  background: #FFF;
  width: 480px;
  border-radius: 0.5rem;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 1.5rem;
    }

    button {
      border: 0;
      background: transparent;
      line-height: 0;
    }

  }
`;

export const StatusContainer = styled.div`
  margin-top: 2rem;

  small {
    font-size: 14px;
    opacity: 0.8;
  }

  div {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const OrderDetails = styled.div`
  margin-top: 2rem;

  > strong {
    font-weight: 500;
    font-size: 0.85rem;
    opacity: 0.8;
  }
`;

export const OrderItems = styled.div`
  margin-top: 1rem;
`;

export const Item = styled.div`
  display: flex;

  & + & {
    margin-top: 1rem;
  }

  img {
    border-radius: 6px;
  }

  > span {
    font-size: 0.85rem;
    color: #666;
    display: block;
    min-width: 20px;
    margin-left: 0.75rem;
  }
`;

export const Details = styled.div`
  margin-left: 0.25rem;

  strong {
    display: block;
    margin-bottom: 0.75rem;
  }

  span {
    font-size: 0.85rem;
    color: #666;
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  margin-top: 1.5rem;

  span {
    font-weight: 500;
    font-size: 0.85rem;
    opacity: 0.8;
  }
`;

export const Actions = styled.footer`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const ButtonVariants = {
  primary: css`
    background: #333;
    color: #FFF;
  `,
  secondary: css`
    background: transparent;
    color: #D73035;
  `
};

export const Button = styled.button<ButtonProps>`
  border-radius: 48px;
  border: 0;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${({ variant }) => variant === 'primary' ? ButtonVariants.primary : ButtonVariants.secondary}
`;
