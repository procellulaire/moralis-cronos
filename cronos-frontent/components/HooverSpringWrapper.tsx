import React from 'react';
import classnames from 'classnames/bind';
import styles from '../styles/HoverSpring.module.css';

const cx = classnames.bind(styles);

interface Props {
  range?: number; // longest distance of a spring
  children: React.ReactNode;
  customStyles?: object;
}
const HoverSpringWrapper: React.FC<Props> = ({ range = 10, children, customStyles }) => {

  return <div style={customStyles} className={cx({
    hoverSpringEffect10: range === 10,
    hoverSpringEffect20: range === 20,
    hoverSpringEffect40: range === 40,
  })}>
    {children}
  </div>;

};

export default HoverSpringWrapper;