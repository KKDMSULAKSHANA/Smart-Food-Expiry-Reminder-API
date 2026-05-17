import React from 'react';
import { Menu, Layout } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  AppstoreOutlined,
  UserOutlined,
  WarningOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/foods',
      icon: <AppstoreOutlined />,
      label: 'Food Management',
    },
    {
      key: '/expiring',
      icon: <WarningOutlined />,
      label: 'Expiring Foods',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'User Management',
    }
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} theme="dark" width={250} breakpoint="lg" collapsedWidth="0">
      <div style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
        {collapsed ? 'FEM' : 'Food Expiry System'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
