import { FC } from 'react';

import { IConstructorElementMock } from './constructor-element-mock-props';

import styled from './constructor-element-mock.module.css';

const ConstructorElementMock: FC<IConstructorElementMock> = ({ direction, text }) => {
  const classElement = styled.element;
  const classDirection = direction === 'top' ? styled['direction-top'] : styled['direction-bottom'];
  return <div className={classElement + ' ' + classDirection}>{text}</div>;
};

export default ConstructorElementMock;
