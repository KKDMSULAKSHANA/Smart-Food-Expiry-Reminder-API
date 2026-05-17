import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import {
  AppstoreOutlined,
  UserOutlined,
  WarningOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const DashboardCards = ({ foodsCount, usersCount, expiringCount, safeCount }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Statistic
            title="Total Foods"
            value={foodsCount}
            prefix={<AppstoreOutlined style={{ color: '#1890ff', marginRight: '8px' }} />}
            valueStyle={{ fontSize: '24px', fontWeight: 'bold' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Statistic
            title="Total Users"
            value={usersCount}
            prefix={<UserOutlined style={{ color: '#722ed1', marginRight: '8px' }} />}
            valueStyle={{ fontSize: '24px', fontWeight: 'bold' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: '#fff1f0' }}>
          <Statistic
            title="Expiring Soon (3 days)"
            value={expiringCount}
            prefix={<WarningOutlined style={{ color: '#cf1322', marginRight: '8px' }} />}
            valueStyle={{ fontSize: '24px', fontWeight: 'bold', color: '#cf1322' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: '#f6ffed' }}>
          <Statistic
            title="Safe Foods"
            value={safeCount}
            prefix={<CheckCircleOutlined style={{ color: '#389e0d', marginRight: '8px' }} />}
            valueStyle={{ fontSize: '24px', fontWeight: 'bold', color: '#389e0d' }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardCards;
