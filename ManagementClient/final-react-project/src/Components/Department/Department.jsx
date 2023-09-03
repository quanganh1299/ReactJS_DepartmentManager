import React, { useEffect, useRef, useState, useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';

import axios, { isCancel, AxiosError } from "axios";

import LoadingDepartment from './LoadingDepartment';
import { departmentAPI } from '../../enviroment';
import { setAuthToken } from '../Login/Login';
import { useFetchData } from '../../manager';

import { Space, Table, Button, FloatButton, Popconfirm, Typography, Alert} from 'antd';
import {EditOutlined, DeleteOutlined, FilterTwoTone, ReloadOutlined, PlusOutlined, LogoutOutlined, WarningFilled} from '@ant-design/icons';

import SetCurrentContext from '../../context/Current';

import styles from '../../css/manager.module.css';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    sorter: (a, b) => a.id - b.id,
    sortDirections: ['descend'],
  },
  {
    title: 'Tên phòng ban',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Số lượng nhân viên',
    dataIndex: 'totalMembers',
    key: 'totalMembers',
    width: 200,
    sorter: (a, b) => a.totalMembers - b.totalMembers,
    sortDirections: ['ascend','descend'],
  },
  {
    title: 'Loại phòng ban',
    key: 'type',
    dataIndex: 'type',
    filters: [
      {
        text: 'DEVELOPER',
        value: 'DEVELOPER'
      },
      {
        text: 'TESTER',
        value: 'TESTER'
      },
      {
        text: 'SCRUM_MASTER',
        value: 'SCRUM_MASTER'
      },
      {
        text: 'PROJECT_MANAGER',
        value: 'PROJECT_MANAGER'
      },
    ],
    onFilter: (value, record) => record.type.indexOf(value) === 0,
    sorter: (a, b) => a.type.localeCompare(b.type),
    sortDirections: ['ascend','descend'],
  },
  {
    title: 'Thời gian tạo',
    key: 'createdAt',
    dataIndex: 'createdAt',
    sorter: (a, b) => {
      const DateA = new Date(a.createdAt); 
      const DateB = new Date(b.createdAt);
      return DateA - DateB;
    },
    sortDirections: ['ascend','descend'],
  },
  {
    title: 'Cập nhật lúc',
    key: 'updatedAt',
    dataIndex: 'updatedAt',
    sorter: (a, b) => {
      const DateA = new Date(a.updatedAt); 
      const DateB = new Date(b.updatedAt);
      return DateA - DateB;
    },
    sortDirections: ['ascend','descend'],
  },
];

const Department = () => {

  const { Text  } = Typography;

  const navigate = useNavigate();

  const setCurrent = useContext(SetCurrentContext);

  const searchRef = useRef(null);
  const minCreatedDateRef = useRef(null);
  const maxCreatedDateRef = useRef(null);
  const minIdRef = useRef(null);
  const maxIdRef = useRef(null);

  const refData = [
    { ref: searchRef, paramName: 'search' },
    { ref: minCreatedDateRef, paramName: 'minCreatedDate' },
    { ref: maxCreatedDateRef, paramName: 'maxCreatedDate' },
    { ref: minIdRef, paramName: 'minId'},
    { ref: maxIdRef, paramName: 'maxId'},
  ];

  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [displayAlert, setDisplayAlert] = useState('none');

  const { fetchData, handleDelete, handleSearch, handleReset } = useFetchData(departmentAPI, pageSize, currentPage, setCurrentPage, setData,setTotalElements, refData);

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      setDisplayAlert('');
      return;
    }
      axios.defaults.headers.common["Authorization"] = sessionStorage.getItem('token');
      fetchData();
  },[pageSize]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const finalColumns = [
  ...columns,
      {
        title: 'Action',
        key: 'action',
        render: (item) => (
            <Space size="middle">
              <Link to={`/departments/${item.id}`}><EditOutlined style={{ fontSize: '20px'}}/></Link>
              <Popconfirm 
                title="Bạn có chắc xóa phòng ban này không?"
                icon={<WarningFilled />} 
                onConfirm={() => handleDelete(item.id)} 
                onCancel={() => {}} 
                okText="Yes" cancelText="No">
                  <Button type='link'><DeleteOutlined style={{ fontSize: '20px'}}/></Button>
              </Popconfirm>
            </Space>
        ),
        align: 'center'
      },
   ];

   return(
    <>
        <div className={styles.manager__filter_form}>
          <Space style={{margin: 10}}>
            <Text className={styles.manager__title_form}>Quản lí phòng ban</Text>
            <Popconfirm
              title="Đăng xuất"
              description="Bạn có muốn đăng xuất không?"
              onConfirm={() => {
                setAuthToken(null);
                sessionStorage.removeItem("token");
                setCurrent('login');
                navigate('/login');
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <LogoutOutlined className={styles.manager__title_icon_form}/>
            </Popconfirm>
          </Space>
          <div className={styles.manager__filter_field}>
            <input
              placeholder="Tìm kiếm" 
              className={styles.manager__input_search}
              ref={searchRef}
            />
            <p>Ngày tạo:</p>
            <input type='date' className={styles.manager__input_date} ref={minCreatedDateRef}/>
            -
            <input type='date' className={styles.manager__input_date} ref={maxCreatedDateRef}/>
            <p>Phòng ban:</p>
            <input 
            type="number" 
            placeholder="Id phòng ban" 
            className={styles.manager__input_id}
            ref={minIdRef}/>
            - 
            <input 
            type="number" 
            placeholder="Id phòng ban" 
            className={styles.manager__input_id}
            ref={maxIdRef}/>
            <Button type="primary" icon={<FilterTwoTone />} onClick={handleSearch} className={styles.manager__btn_search}>
              Filter and Search
            </Button>
            <Button type="primary" icon={<ReloadOutlined />} onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
        <Alert 
        type="error" 
        message="Xin lỗi, bạn cần đăng nhập để truy cập hệ thống. Vui lòng đăng nhập để truy cập hệ thống của công ty" 
        banner 
        style={{display: displayAlert}}/> 
        {data.length > 0 ?
        <Table columns={finalColumns} 
            dataSource={data.map((item) => ({...item,key: item.id}))}  
            pagination={{ 
                current: currentPage,
                pageSize: pageSize,
                total: totalElements,
                position: ['bottomCenter'], 
                showSizeChanger:true,
                pageSizeOptions:['10', '20', '30'],
                onShowSizeChange : (_, size) => {setPageSize(size); setCurrentPage(1)},
                onChange : (page) => setCurrentPage(page),
            }}
        /> : <LoadingDepartment />}
        <Link to='/departments/create'>
          <FloatButton
          icon={<PlusOutlined />}
          type="primary"
          tooltip="Create"
          className={styles.manager__btn_create}/>
        </Link>
    </>
)
}

export default Department;



