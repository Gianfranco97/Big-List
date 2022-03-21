import { Modal } from 'antd';

const { confirm } = Modal;

function showDeleteConfirm(onOk) {
  confirm({
    title: '¿Estás seguro de que quieres cerrar la sesión?',
    okText: 'Si',
    okType: 'danger',
    cancelText: 'No',
    onOk,
  });
}

export default showDeleteConfirm;
