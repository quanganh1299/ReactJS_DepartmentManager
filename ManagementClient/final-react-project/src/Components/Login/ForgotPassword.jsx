import React, { useEffect, useState } from 'react';
import { Input, Button, Modal, message } from 'antd';
import styles from '../../css/forgotpassword.module.css';
import axios, { isCancel, AxiosError } from "axios";
import { forgotPasswordAPI } from '../../enviroment';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);
    const [password, setPassword] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate();

    const handleOk = () => {
        axios.post(`${forgotPasswordAPI}/reset-password`, { token: token, password: password })
            .then(() => {
                messageApi
                    .open({
                        type: 'success',
                        content: 'Đổi mật khẩu thành công!',
                        duration: 1,
                        className: styles.forgotpassword__message
                    })
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
                messageApi
                    .open({
                        type: 'error',
                        content: 'Đổi mật khẩu thất bại, mời kiểm tra lại thông tin!',
                        duration: 1,
                    })
            });
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleForgotPassword = () => {
        axios.post(`${forgotPasswordAPI}/forgot-password`, { email: email })
            .then(() => {
                setIsModalOpen(true);
            })
            .catch((err) => console.log(err));
    }


    return (
        <>
            <div className={styles.forgotpassword__container}>
                <h1>Quên mật khẩu</h1>
                <Input placeholder="Mời bạn nhập email" style={{ width: 500 }} onChange={(e) => setEmail(e.target.value)} />
                <Button type='primary' style={{ marginTop: 25 }} onClick={handleForgotPassword}>Nhận mã reset password</Button>
            </div>
            <Modal title="Đổi mật khẩu" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {contextHolder}
                <Input placeholder="Mời bạn nhập mã được gửi tới email" style={{ marginBottom: 15 }} onChange={(e) => setToken(e.target.value)} />
                <Input.Password placeholder="Mời bạn nhập mật khẩu mới" onChange={(e) => setPassword(e.target.value)} />
            </Modal>
        </>
    )
}

export default ForgotPassword;