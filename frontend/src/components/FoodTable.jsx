import React from 'react';
import { Table, Button, Space, Popconfirm, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const FoodTable = ({ data, loading, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'foodName',
      key: 'foodName',
      sorter: (a, b) => a.foodName.localeCompare(b.foodName),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Vegetables', value: 'Vegetables' },
        { text: 'Fruits', value: 'Fruits' },
        { text: 'Dairy', value: 'Dairy' },
        { text: 'Meat', value: 'Meat' },
        { text: 'Beverages', value: 'Beverages' },
        { text: 'Snacks', value: 'Snacks' },
        { text: 'Other', value: 'Other' },
      ],
      onFilter: (value, record) => record.category === value,
      render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (date) => (date ? dayjs(date).format('YYYY-MM-DD') : 'N/A'),
      sorter: (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'green';
        if (status === 'Expired') color = 'red';
        if (status === 'Consumed') color = 'default';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            size="small"
          />
          <Popconfirm
            title="Delete this food item?"
            description="Are you sure to delete this food?"
            onConfirm={() => onDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const getRowClassName = (record) => {
    if (!record.expiryDate) return '';
    const expiry = dayjs(record.expiryDate);
    const today = dayjs();
    const diff = expiry.diff(today, 'day');
    if (diff <= 3 && diff >= 0 && record.status === 'Available') {
      return 'urgent-row';
    }
    return '';
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="_id"
      loading={loading}
      pagination={{ pageSize: 10 }}
      rowClassName={getRowClassName}
    />
  );
};

export default FoodTable;
