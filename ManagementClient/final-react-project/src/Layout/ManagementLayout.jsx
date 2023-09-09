import { Link, Outlet } from "react-router-dom";
import React, { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { TeamOutlined, HomeOutlined, PartitionOutlined, IdcardOutlined } from '@ant-design/icons';
import SetManagerContext from "../context/ManagerContext";
import { setAuthToken } from '../Components/Login/Login';
import styles from './manager-layout.module.css'


const ManagementLayout = () => {

  const { Header, Footer, Content } = Layout;

  const items = [
    {
      label: <Link to='/'>Trang chủ</Link>,
      key: 'homepage',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to='/departments'>Phòng ban</Link>,
      key: 'departments',
      icon: <PartitionOutlined />,
    },
    {
      label: <Link to='/accounts'>Nhân viên</Link>,
      key: 'accounts',
      icon: <TeamOutlined />,
    },
    {
      label: <Link to='/login'>Đăng nhập</Link>,
      onClick: () => {
        setDisplayUsername('none');
      },
      key: 'login',
      icon: <IdcardOutlined />,
    },
  ];

  const [current, setCurrent] = useState(() => {
    const storedValue = localStorage.getItem('currentNavigation');
    return storedValue;
  });

  const [displayUsername, setDisplayUsername] = useState('none');

  const [inforUsername, setInforUsername] = useState(null);

  const onClick = (e) => {
    setCurrent(e.key);
    localStorage.setItem('currentNavigation', e.key);
  };

  const contextValue = {
    setCurrent,
    setDisplayUsername,
    setInforUsername
  };


  return (
    <>
      <Layout className={styles.manager__container}>
        <Header>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            theme='dark'
          />
          <Typography.Text className={styles.manager__title} style={{ display: displayUsername }}>Username: {inforUsername}</Typography.Text>
        </Header>
        <Content className={styles.manager__content}>
          <SetManagerContext.Provider value={contextValue}>
            <Outlet />
          </SetManagerContext.Provider>
        </Content>
        <Footer className={styles.manager__footer}>Copyright 2023 © Manager</Footer>
      </Layout>
    </>
  )
}
export default ManagementLayout;