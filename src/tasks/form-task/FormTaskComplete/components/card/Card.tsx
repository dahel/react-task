import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px 10px;
  flex-wrap: wrap;
  justify-content: space-between;
  border: solid 1px #bdbdbd;
  position: relative;
  margin-top: 30px;
  opacity: ${(props: { pending: boolean }) => (props.pending ? 0.5 : 1)};
  pointer-events: ${(props: { pending: boolean }) => (props.pending ? 'none' : 'initial')};
  transition: all 0.2s;
`;

const Title = styled.h3`
  position: absolute;
  top: -28px;
  left: 10px;
  padding: 0 5px;
  background-color: white;
`;

interface IProps {
  children: ReactNode[];
  title: string;
  pending?: boolean;
}

const Card = ({ children, title, pending = false }: IProps) => {
  return (
    <Wrapper pending={pending}>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  );
};

export default Card;
