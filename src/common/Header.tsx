import * as React from 'react';
import { StyledHeader, Logo } from './Header.styles';

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Logo
        src="../images/logo.png"
        alt="Beerschot Abonnementen Saldo Checker logo"
      />
    </StyledHeader>
  );
};

export default Header;
