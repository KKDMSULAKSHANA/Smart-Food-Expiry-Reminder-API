import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const UserForm = ({ visible, onCreate, onCancel, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (initialData) {
        form.setFieldsValue(initialData);
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialData, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={visible}
      title={initialData ? 'Edit User' : 'Add New User'}
      okText={initialData ? 'Update' : 'Create'}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical" name="user_form">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the user name!' }]}
        >
          <Input placeholder="Enter user name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input the user email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: !initialData, message: 'Please input the password!' }]}
          extra={initialData ? "Leave blank to keep current password" : ""}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
