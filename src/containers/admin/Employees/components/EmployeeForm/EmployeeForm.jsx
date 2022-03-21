import React, { useCallback, useState } from 'react';
import {
  Modal, Form, Input, Spin, InputNumber, notification,
} from 'antd';
import PropTypes from 'prop-types';
import api from 'utils/api-rest';
import useDidMountEffect from 'hooks/useDidMountEffect';

const INNITIAL_EMPLOYEE = {
  id: undefined,
  name: undefined,
  email: undefined,
  age: undefined,
  salary: undefined,
};

function EmployeeForm({ visible, selectedEmployee, closeModal }) {
  const [myForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onClose = useCallback(
    (update) => {
      closeModal(update);
      myForm.setFieldsValue(INNITIAL_EMPLOYEE);
    },
    [closeModal, myForm],
  );

  const save = useCallback(
    async (values) => {
      setLoading(true);

      try {
        if (selectedEmployee) {
          await api.updateEmployee({ id: selectedEmployee.id, ...values });
        } else {
          await api.addEmployee(values);
        }

        onClose(true);
      } catch (error) {
        notification.error({
          message: 'Error del servidor',
          description: 'Error al guardar los datos',
        });
      } finally {
        setLoading(false);
      }
    },
    [onClose, selectedEmployee],
  );

  useDidMountEffect(() => {
    myForm.setFieldsValue(selectedEmployee || INNITIAL_EMPLOYEE);
  }, [selectedEmployee]);

  return (
    <Modal
      title={
        selectedEmployee
          ? `Actualizar '${selectedEmployee.name}'`
          : 'Agregar nuevo empleado'
      }
      visible={visible}
      getContainer={false}
      onOk={() => myForm.submit()}
      onCancel={() => onClose()}
      okText={selectedEmployee ? 'Actualizar' : 'Agregar'}
      cancelText="Cancelar"
    >
      <Spin spinning={loading} delay={500}>
        <Form
          form={myForm}
          initialValues={selectedEmployee}
          onFinish={save}
          layout="vertical"
          name="userForm"
        >
          <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="age" label="Edad" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item name="salary" label="Salario">
            <InputNumber addonAfter="€" min={0} />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

EmployeeForm.defaultProps = {
  selectedEmployee: null,
};

EmployeeForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  selectedEmployee: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.number,
    salary: PropTypes.number,
  }),
};

export default EmployeeForm;
