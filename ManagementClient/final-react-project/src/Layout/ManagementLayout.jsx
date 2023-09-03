import { Link, Outlet } from "react-router-dom";
import React, { useState } from 'react';
import { Layout, Menu} from 'antd';
import { TeamOutlined, HomeOutlined, PartitionOutlined, IdcardOutlined } from '@ant-design/icons';
import SetCurrentContext from "../context/Current";
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
          key: 'login',
          icon: <IdcardOutlined />,
        },
      ];

      const [current, setCurrent] = useState(() => {
        const storedValue = localStorage.getItem('currentNavigation');
        return storedValue;
      });
        const onClick = (e) => {
          setCurrent(e.key);
          localStorage.setItem('currentNavigation', e.key);
        };
        

    return(
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
            </Header>
            <Content className={styles.manager__content}>
              <SetCurrentContext.Provider value={setCurrent}>
                <Outlet />
              </SetCurrentContext.Provider>
            </Content>
            <Footer className={styles.manager__footer}>Copyright 2023 © Manager</Footer>
            </Layout>
        </>
    )
}
export default ManagementLayout;