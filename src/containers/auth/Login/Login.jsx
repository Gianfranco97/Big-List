import React, { useCallback, useState } from 'react';
import {
  Form, Input, Button, Spin,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from 'components/AuthLayout';
import api from 'utils/api-rest';
import AuthenticatedContext from 'components/AuthenticatedContext';
import './Login.less';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useCallback(
    async (values, changeAuthenticatedStatus) => {
      setLoading(true);

      try {
        const res = await api.login(values.username, values.password);
        sessionStorage.setItem('session-token', res['session-token']);
        changeAuthenticatedStatus(true);

        setLoading(false);
        navigate('/');
      } catch (error) {
        setLoading(false);
      }
    },
    [navigate],
  );

  return (
    <AuthLayout>
      <Spin spinning={loading} delay={500}>
        <AuthenticatedContext.Consumer>
          {({ changeAuthenticatedStatus }) => (
            <Form
              className="login-form"
              onFinish={(e) => login(e, changeAuthenticatedStatus)}
            >
              <Form.Item name="username" rules={[{ required: true, type: 'email' }]}>
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true }]}>
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Contraseña"
                />
              </Form.Item>

              <Link to="/forgot-password" className="login-form__go-forgot">
                Olvide la contraseña
              </Link>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form__submit"
                >
                  Iniciar sesión
                </Button>
              </Form.Item>
            </Form>
          )}
        </AuthenticatedContext.Consumer>
      </Spin>
    </AuthLayout>
  );
}

export default LoginPage;
