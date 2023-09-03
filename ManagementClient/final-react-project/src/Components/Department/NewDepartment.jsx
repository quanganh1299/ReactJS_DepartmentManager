import {Button, Form, Alert, message} from 'antd'
import React, { useRef } from 'react'
import axios, { isCancel, AxiosError } from "axios";
import { departmentAPI } from '../../enviroment';
import styles from '../../css/createmanager.module.css'
import { useNavigate } from 'react-router-dom';

const NewDepartment = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const inputRefName = useRef('');
    const inputRefType = useRef('');

    const navigate = useNavigate();

    const handlePostData = async() => {
        const dataPost = { 
            name: inputRefName.current.value,
            type: inputRefType.current.value,
        }  

        await axios.post(departmentAPI, dataPost)
                   .then(res => {
                        console.log('oke');
                        messageApi
                        .open({
                          type: 'success',
                          content: 'Thêm phòng ban thành công!',
                          duration: 1,
                          className: styles.manager__message,
                        })
                        setTimeout(() => {
                            navigate('/departments');
                        }, 1500);
                    })
                    .catch(err => {
                        console.log(err, 'opp');
                        messageApi
                        .open({
                          type: 'error',
                          content: 'Thêm phòng ban thất bại!',
                          duration: 1,
                          className: styles.manager__message,
                        })
                    });
    }

    return(
        <Form className={styles.manager__create_form}>
            {contextHolder}
            <h2>Tạo mới phòng ban</h2>
            <label>
            <span>Tên phòng ban</span>
            <input
                placeholder="Tên phòng ban"
                aria-label="name"
                type="text"
                name="name"
                ref={inputRefName}
                className={styles.manager__input_create_form}
            />
            </label>
            <label>
            <span style={{marginLeft: -5}}>Loại phòng ban</span>
            <select
                placeholder="Loại phòng ban"
                aria-label="type"
                type="text"
                name="type"
                ref={inputRefType}
                className={styles.manager__input_create_form}
            >
                <option value="DEVELOPER">DEVELOPER</option>
                <option value="TESTER">TESTER</option>
                <option value="SCRUM_MASTER">SCRUM_MASTER</option>
                <option value="PROJECT_MANAGER">PROJECT_MANAGER</option>
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

export default NewDepartment;