import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import styles from './homepage.module.css';
import SetManagerContext from "../../context/ManagerContext";

const HomePage = () => {

    const navigate = useNavigate();

    const { setCurrent, setDisplayUsername, setInforUsername } = useContext(SetManagerContext);
    setCurrent('homepage')

    const handleLoginClick = () => {
        setDisplayUsername('none');
        navigate('/login');
        setCurrent('login');
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h1>Manager</h1>
                    <p>Website quản lí nhân viên và phòng ban hiệu quả nhất hiện nay</p>
                    <button onClick={handleLoginClick} className={styles.btn}>Đăng nhập</button>
                </div>
            </div>
        </>
    )
}

export default HomePage;