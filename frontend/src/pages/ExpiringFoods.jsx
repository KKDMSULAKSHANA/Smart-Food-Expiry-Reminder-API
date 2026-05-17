import React, { useState, useEffect } from 'react';
import { Card, Typography, message, Tag, Alert } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import FoodTable from '../components/FoodTable';
import foodService from '../services/foodService';

const { Title, Paragraph } = Typography;

const ExpiringFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExpiringFoods();
  }, []);

  const fetchExpiringFoods = async () => {
    try {
      setLoading(true);
      const data = await foodService.getExpiringFoods();
      setFoods(data || []);
    } catch (error) {
      message.error('Failed to fetch expiring foods');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    message.info('Please go to the Food Management page to edit.');
  };

  const handleDelete = async (id) => {
    try {
      await foodService.deleteFood(id);
      message.success('Food deleted successfully');
      fetchExpiringFoods();
    } catch (error) {
      message.error('Failed to delete food');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '12px' }}>
        <WarningOutlined style={{ fontSize: '32px', color: '#cf1322' }} />
        <Title level={2} style={{ margin: 0, color: '#cf1322' }}>Expiring Foods Alert</Title>
      </div>

      <Alert
        message="Urgent Attention Required"
        description="The following items are expiring within the next 3 days. Please prioritize using or disposing of them."
        type="error"
        showIcon
        style={{ marginBottom: '24px', borderRadius: '8px' }}
      />

      <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <FoodTable
          data={foods}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>
    </div>
  );
};

export default ExpiringFoods;
