import {Button, Form, Alert, message} from 'antd'
import React, { useRef, useState } from 'react'
import axios, { isCancel, AxiosError } from "axios";
import { accountAPI, departmentAPI } from '../../enviroment';
import styles from '../../css/createmanager.module.css'
import { useNavigate } from 'react-router-dom';

const NewAccount = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const[dataDepartment, setDataDepartment] = useState([]);
    const[departmentId, setDepartmentId] = useState(1);

    const inputRefFirstName = useRef(null);
    const inputRefLastName = useRef(null);
    const inputRefRole = useRef(null);
    const inputRefPassword = useRef(null);
    const inputRefEmail = useRef(null);
    const inputRefUserName = useRef(null);

    const navigate = useNavigate();

    React.useEffect(() => {
        axios.get(departmentAPI).then(res=> {
            setDataDepartment(res.data.content);
        });
    })

    const handlePostData = async() => {
        const dataPost = { 
            firstName: inputRefFirstName.current.value,
            lastName: inputRefLastName.current.value,
            role: inputRefRole.current.value,
            email: inputRefEmail.current.value,
            password: inputRefPassword.current.value,
            username: inputRefUserName.current.value,
            departmentId: departmentId
        }  

        await axios.post(accountAPI, dataPost)
                   .then(res => {
                        console.log('oke');
                        messageApi
                        .open({
                          type: 'success',
                          content: 'Thêm nhân viên thành công!',
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
                          content: 'Thêm nhân viên thất bại!',
                          duration: 1,
                          className: styles.manager__message,
                        })
                    });
    }

    return(
        <Form className={styles.manager__create_form}>
            {contextHolder}
            <h2>Thêm nhân viên</h2>
            <label>
            <span style={{marginLeft: -40}}>Username</span>
            <input
                placeholder="Username"
                aria-label="username"
                type="text"
                name="username"
                ref={inputRefUserName}
                className={styles.manager__input_create_form}
            />
            </label>
            <label>
            <span>Họ</span>
            <input
                placeholder="Họ"
                aria-label="firstName"
                type="text"
                name="firstName"
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
                onClick={handlePostData}
                type='primary' 
                className={styles.manager__create_btn}>
                    Submit
                </Button>
                <Button type="primary" onClick={() => navigate(-1)} className={styles.manager__create_btn}>Cancel</Button>
            </div>
        </Form>
    )
}

export default NewAccount;