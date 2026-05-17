import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Space, Typography, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import FoodTable from '../components/FoodTable';
import FoodForm from '../components/FoodForm';
import foodService from '../services/foodService';

const { Title } = Typography;

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const data = await foodService.getAllFoods();
      setFoods(data || []);
    } catch (error) {
      message.error('Failed to fetch foods');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (values) => {
    try {
      if (editingFood) {
        await foodService.updateFood(editingFood._id, values);
        message.success('Food updated successfully');
      } else {
        await foodService.createFood(values);
        message.success('Food added successfully');
      }
      setIsModalVisible(false);
      setEditingFood(null);
      fetchFoods();
    } catch (error) {
      message.error(editingFood ? 'Failed to update food' : 'Failed to add food');
    }
  };

  const handleDelete = async (id) => {
    try {
      await foodService.deleteFood(id);
      message.success('Food deleted successfully');
      fetchFoods();
    } catch (error) {
      message.error('Failed to delete food');
    }
  };

  const handleEdit = (record) => {
    setEditingFood(record);
    setIsModalVisible(true);
  };

  const handleAddNew = () => {
    setEditingFood(null);
    setIsModalVisible(true);
  };

  const filteredFoods = foods.filter(food => 
    food.foodName?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0 }}>Food Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew} size="large">
          Add Food
        </Button>
      </div>

      <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search by food name..."
            prefix={<SearchOutlined />}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
        </Space>
        
        <FoodTable
          data={filteredFoods}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <FoodForm
        visible={isModalVisible}
        onCreate={handleCreate}
        onCancel={() => setIsModalVisible(false)}
        initialData={editingFood}
      />
    </div>
  );
};

export default Foods;
