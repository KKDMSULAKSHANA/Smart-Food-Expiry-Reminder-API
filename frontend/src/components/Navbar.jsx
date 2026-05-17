import React from 'react';
import { Layout, Button, Avatar, Space, Typography, Switch } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BulbOutlined,
  BulbFilled
} from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = ({ collapsed, setCollapsed, darkMode, setDarkMode }) => {
  return (
    <Header style={{ padding: '0 24px', background: darkMode ? '#141414' : '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,21,41,.08)', zIndex: 1 }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
          color: darkMode ? '#fff' : 'inherit'
        }}
      />
      <Space size="large">
        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          checkedChildren={<BulbFilled />}
          unCheckedChildren={<BulbOutlined />}
        />
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Text style={{ color: darkMode ? '#fff' : 'inherit' }}>Admin User</Text>
        </Space>
      </Space>
    </Header>
  );
};

export default Navbar;
