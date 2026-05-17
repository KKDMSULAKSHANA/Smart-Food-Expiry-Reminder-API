import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Space, Typography, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import userService from '../services/userService';

const { Title } = Typography;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data || []);
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (values) => {
    try {
      if (editingUser) {
        // If password is not provided, remove it from payload so backend doesn't overwrite with empty
        const payload = { ...values };
        if (!payload.password) {
          delete payload.password;
        }
        await userService.updateUser(editingUser._id, payload);
        message.success('User updated successfully');
      } else {
        await userService.createUser(values);
        message.success('User added successfully');
      }
      setIsModalVisible(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      message.error(editingUser ? 'Failed to update user' : 'Failed to add user');
    }
  };

  const handleDelete = async (id) => {
    try {
      await userService.deleteUser(id);
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    setIsModalVisible(true);
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchText.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0 }}>User Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew} size="large">
          Add User
        </Button>
      </div>

      <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search by name or email..."
            prefix={<SearchOutlined />}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
        </Space>
        
        <UserTable
          data={filteredUsers}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <UserForm
        visible={isModalVisible}
        onCreate={handleCreate}
        onCancel={() => setIsModalVisible(false)}
        initialData={editingUser}
      />
    </div>
  );
};

export default Users;
