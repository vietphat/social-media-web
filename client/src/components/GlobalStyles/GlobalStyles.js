import React from 'react';
import './GlobalStyles.module.scss';

const GlobalStyles = ({ children }) => {
  return React.Children.only(children);
};

export default GlobalStyles;
