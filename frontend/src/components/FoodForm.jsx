import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

const FoodForm = ({ visible, onCreate, onCancel, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (initialData) {
        form.setFieldsValue({
          ...initialData,
          purchaseDate: initialData.purchaseDate ? dayjs(initialData.purchaseDate) : null,
          expiryDate: initialData.expiryDate ? dayjs(initialData.expiryDate) : null,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialData, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate({
          ...values,
          purchaseDate: values.purchaseDate ? values.purchaseDate.toISOString() : null,
          expiryDate: values.expiryDate ? values.expiryDate.toISOString() : null,
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={visible}
      title={initialData ? 'Edit Food' : 'Add New Food'}
      okText={initialData ? 'Update' : 'Create'}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical" name="food_form">
        <Form.Item
          name="foodName"
          label="Food Name"
          rules={[{ required: true, message: 'Please input the food name!' }]}
        >
          <Input placeholder="Enter food name" />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Select category">
            <Option value="Vegetables">Vegetables</Option>
            <Option value="Fruits">Fruits</Option>
            <Option value="Dairy">Dairy</Option>
            <Option value="Meat">Meat</Option>
            <Option value="Beverages">Beverages</Option>
            <Option value="Snacks">Snacks</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: 'Please input the quantity!' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} placeholder="Enter quantity" />
        </Form.Item>
        <Form.Item
          name="purchaseDate"
          label="Purchase Date"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="expiryDate"
          label="Expiry Date"
          rules={[{ required: true, message: 'Please select an expiry date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          initialValue="Available"
        >
          <Select>
            <Option value="Available">Available</Option>
            <Option value="Consumed">Consumed</Option>
            <Option value="Expired">Expired</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FoodForm;
