import { useParams, useNavigate  } from "react-router-dom";
import axios, { isCancel, AxiosError } from "axios";
import { departmentAPI } from "../../enviroment";
import {Form, Button, message} from 'antd';
import styles from '../../css/createmanager.module.css';
import React, { useState, useRef} from "react";

const EditDepartment = () => {
    const[data, setData] = useState({name: '', type: '', totalMembers: ''});

    const [messageApi, contextHolder] = message.useMessage();

    const paramUrl = useParams();

    const inputRefName = useRef(null);
    const inputRefType = useRef(null);

    const navigate = useNavigate();

    React.useEffect(() => {
        // call api get lay ra chi tiet cua item user data
        if(paramUrl?.id){
         axios.get(departmentAPI+`/${paramUrl?.id}`).then(res => setData(res.data));
         console.log(data.name);
         console.log(data.type);
        }
    }, []);

    const handlePutData = async() => {
        const dataPut = { 
            name: inputRefName.current.value,
            type: inputRefType.current.value,
            totalMembers: data.totalMembers
        }  

        await axios.put(departmentAPI+`/${paramUrl?.id}`, dataPut)
                   .then(res => {
                        console.log('oke');
                        messageApi
                        .open({
                          type: 'success',
                          content: 'Sửa phòng ban thành công!',
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
                          content: 'Sửa phòng ban thất bại!',
                          duration: 1,
                          className: styles.manager__message,
                        })
                    });
    }
    
    return(

        <Form className={styles.manager__create_form}>
            {contextHolder}
            <h2>Sửa thông tin phòng ban</h2>
            <label>
            <span>Tên phòng ban</span>
            <input
                placeholder="Tên phòng ban"
                aria-label="name"
                type="text"
                name="name"
                defaultValue={data.name}
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

export default EditDepartment;