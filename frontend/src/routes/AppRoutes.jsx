import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider, theme } from 'antd';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Dashboard from '../pages/Dashboard';
import Foods from '../pages/Foods';
import Users from '../pages/Users';
import ExpiringFoods from '../pages/ExpiringFoods';
import NotFound from '../pages/NotFound';

const { Content } = Layout;

const AppRoutes = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          fontFamily: "'Inter', sans-serif",
          borderRadius: 8,
        },
      }}
    >
      <Layout className="layout-container" style={{ minHeight: '100vh' }}>
        <Sidebar collapsed={collapsed} />
        <Layout>
          <Navbar 
            collapsed={collapsed} 
            setCollapsed={setCollapsed} 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
          />
          <Content className="content-area" style={{ background: darkMode ? '#000' : '#f0f2f5' }}>
            <div style={{ 
              padding: 24, 
              minHeight: 360, 
              background: darkMode ? '#141414' : '#fff',
              borderRadius: '8px',
              boxShadow: darkMode ? 'none' : '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
            }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/foods" element={<Foods />} />
                <Route path="/users" element={<Users />} />
                <Route path="/expiring" element={<ExpiringFoods />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppRoutes;
