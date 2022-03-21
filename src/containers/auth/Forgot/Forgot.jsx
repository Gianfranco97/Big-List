import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button, Spin,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AuthLayout from 'components/AuthLayout';
import './Forgot.less';

function Message() {
  return (
    <>
      <h2>Mensaje enviado con éxito</h2>

      <p>
        <b>Nota: </b>
        Este mensaje es mentira, por el momento esto es solo una prueba. En el
        futuro, si me contratan, haré esta función y muchas más ^_^
      </p>

      <Link to="/login">
        <Button type="primary" className="forgot-form-button">
          Ir a iniciar sesión
        </Button>
      </Link>
    </>
  );
}

function ForgotForm({ onFinish }) {
  return (
    <Form className="forgot-form" onFinish={onFinish}>
      <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="Correo electrónico"
        />
      </Form.Item>

      <Link className="forgot-form__go-login" to="/login">
        Ir a iniciar sesión
      </Link>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="forgot-form__submit"
        >
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

ForgotForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

function ForgotPage() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const onFinish = useCallback(() => {
    setLoading(true);

    // setTimeout Used only to simulate a more realistic response time
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
    }, 1000);
  }, []);

  return (
    <AuthLayout>
      <Spin spinning={loading} delay={500}>
        {emailSent ? <Message /> : <ForgotForm onFinish={onFinish} />}
      </Spin>
    </AuthLayout>
  );
}

export default ForgotPage;
