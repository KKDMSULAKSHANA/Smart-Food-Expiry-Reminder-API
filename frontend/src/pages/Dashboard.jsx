import React, { useState, useEffect } from 'react';
import { Typography, message, Row, Col, Card } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import DashboardCards from '../components/DashboardCards';
import Loader from '../components/Loader';
import foodService from '../services/foodService';
import userService from '../services/userService';

const { Title } = Typography;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [users, setUsers] = useState([]);
  const [expiringFoods, setExpiringFoods] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [foodsData, usersData, expiringData] = await Promise.all([
        foodService.getAllFoods(),
        userService.getAllUsers(),
        foodService.getExpiringFoods()
      ]);
      
      setFoods(foodsData || []);
      setUsers(usersData || []);
      setExpiringFoods(expiringData || []);
    } catch (error) {
      message.error('Failed to fetch dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  // Prepare data for chart
  const categoryCount = foods.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(categoryCount).map(key => ({
    name: key,
    count: categoryCount[key]
  }));

  const safeCount = foods.length - expiringFoods.length;

  return (
    <div>
      <Title level={2} style={{ marginBottom: '24px' }}>Dashboard Overview</Title>
      
      <DashboardCards 
        foodsCount={foods.length} 
        usersCount={users.length} 
        expiringCount={expiringFoods.length}
        safeCount={safeCount >= 0 ? safeCount : 0}
      />

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Foods by Category" bordered={false} style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ height: 300 }}>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#1890ff" radius={[4, 4, 0, 0]} name="Number of Items" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  No data available for chart.
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
