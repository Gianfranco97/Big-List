import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function showDeleteConfirm(name, id, onOk) {
  confirm({
    title: '¿Estás seguro de eliminar a este empleado?',
    icon: <ExclamationCircleOutlined />,
    content: `Toda la información de '${name}' será borrada`,
    okText: 'Si',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      onOk(id);
    },
  });
}

export default showDeleteConfirm;
