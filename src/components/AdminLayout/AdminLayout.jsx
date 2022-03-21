import React, { useCallback } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import api from 'utils/api-rest';
import logoIMG from 'assets/img/logo.svg';
import AuthenticatedContext from '../AuthenticatedContext';
import confirmLogout from './confirmLogout';
import './AdminLayout.less';

const { Header, Content, Footer } = Layout;

function AdminLayout({ children }) {
  const navigate = useNavigate();

  const logout = useCallback(
    (changeAuthenticatedStatus) => {
      confirmLogout(async () => {
        try {
          await api.logout();
        } finally {
          sessionStorage.clear();
          changeAuthenticatedStatus(false);
          navigate('/login');
        }
      });
    },
    [navigate],
  );

  return (
    <AuthenticatedContext.Consumer>
      {({ changeAuthenticatedStatus }) => (
        <Layout className="admin-layout">
          <Layout>
            <Header className="admin-layout__header">
              <img src={logoIMG} alt="Big Buy" />

              <LogoutOutlined
                className="admin-layout__header__logout"
                onClick={() => logout(changeAuthenticatedStatus)}
              />
            </Header>

            <Content className="admin-layout__content">
              <main>{children}</main>
            </Content>

            <Footer>Gianfranco Manganiello ©2022</Footer>
          </Layout>
        </Layout>
      )}
    </AuthenticatedContext.Consumer>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
};

export default AdminLayout;
