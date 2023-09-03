import { useParams, useNavigate  } from "react-router-dom";
import axios, { isCancel, AxiosError } from "axios";
import {Form, Button, message} from 'antd';
import styles from '../../css/createmanager.module.css';
import React, { useState, useRef} from "react";
import { accountAPI, departmentAPI } from "../../enviroment";

const EditAccount = () => {
    const[data, setData] = useState([]);
    const[dataDepartment, setDataDepartment] = useState([]);
    const[departmentId, setDepartmentId] = useState(1);

    const [messageApi, contextHolder] = message.useMessage();

    const paramUrl = useParams();

    const inputRefFirstName = useRef(null);
    const inputRefLastName = useRef(null);
    const inputRefRole = useRef(null);
    const inputRefPassword = useRef(null);
    const inputRefEmail = useRef(null);

    const navigate = useNavigate();

    React.useEffect(() => {
        axios.defaults.headers.common["Authorization"] = sessionStorage.getItem('token');
        // call api get lay ra chi tiet cua item user data
        if(paramUrl?.id){
         axios.get(accountAPI+`/${paramUrl?.id}`).then(res => setData(res.data));
        }
        axios.get(departmentAPI).then(res=> {
            setDataDepartment(res.data.content);
        });
        
    }, []);


    const handlePutData = async() => {
        const dataPut = { 
            firstName: inputRefFirstName.current.value,
            lastName: inputRefLastName.current.value,
            role: inputRefRole.current.value,
            email: inputRefEmail.current.value,
            password: inputRefPassword.current.value,
            departmentId: departmentId
        }  

        await axios.put(accountAPI+`/${paramUrl?.id}`, dataPut)
                   .then(res => {
                        console.log('oke');
                        messageApi
                        .open({
                          type: 'success',
                          content: 'Sửa thông tin nhân viên thành công!',
                          duration: 1,
                          className: styles.manager__message,
                        })
                        setTimeout(() => {
                            navigate('/accounts');
                        }, 1500);
                    })
                    .catch(err => {
                        console.log(err, 'opp');
                        messageApi
                        .open({
                          type: 'error',
                          content: 'Sửa thông tin nhân viên thất bại!',
                          duration: 1,
                          className: styles.manager__message,
                        })
                    });
    }
    
    return(

        <Form className={styles.manager__create_form}>
            {contextHolder}
            <h2>Sửa thông tin nhân viên</h2>
            <label>
            <span>Họ</span>
            <input
                placeholder="Họ"
                aria-label="firstName"
                type="text"
                name="firstName"
                defaultValue={data.firstName}
                ref={inputRefFirstName}
                className={styles.manager__input_create_form}
            />
            </label>
            <label>
            <span style={{marginLeft: -3}}>Tên</span>
            <input
                placeholder="Tên"
                aria-label="lastName"
                type="text"
                name="lastName"
                defaultValue={data.lastName}
                ref={inputRefLastName}
                className={styles.manager__input_create_form}
            />
            </label>
            <label>
            <span style={{marginLeft: -22}}>Vai trò</span>
            <select
                placeholder="Vai trò"
                aria-label="role"
                type="text"
                name="role"
                ref={inputRefRole}
                className={styles.manager__input_create_form}
            >
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
            </select>
            </label>
            <label>
            <span style={{marginLeft: -16}}>Email</span>
            <input
                placeholder="Nhập email"
                aria-label="email"
                type="text"
                name="email"
                ref={inputRefEmail}
                className={styles.manager__input_create_form}
            />
            </label>
            <label>
            <span style={{marginLeft: -40}}>Password</span>
            <input
                placeholder="Nhập password"
                aria-label="password"
                type="password"
                name="password"
                ref={inputRefPassword}
                className={styles.manager__input_create_form}
            />
            </label>
            <label>
            <span style={{marginLeft: -87}}>Chọn phòng ban</span>
            <select
                aria-label="departmentId"
                type="text"
                name="departmentId"
                onChange={(e) => setDepartmentId(e.target.value)}
                className={styles.manager__input_create_form}
            >
                {dataDepartment.map((department) => 
                <option key={department.id} value={department.id}>{department.name}</option>
                )}
            </select>
            </label>
            <div className={styles.manager__btn_create_form_group}>
                <Button 
                onClick={handlePutData}
                type='primary' 
                className={styles.manager__create_btn}>
                    Submit
                </Button>
                <Button type="primary" onClick={() => navigate(-1)} className={styles.manager__create_btn}>Cancel</Button>
            </div>
        </Form>
    )
}

export default EditAccount;