import React from 'react';
import PropTypes from 'prop-types';
import logoIMG from 'assets/img/logo.svg';
import './AuthLayout.less';

function AuthLayout({ children }) {
  return (
    <div className="auth-page-container">
      <div className="auth-form">
        <div className="auth-form-logo">
          <img src={logoIMG} alt="Big-Buy" />
        </div>

        {children}
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
};

export default AuthLayout;
