import { useNavigate, useRouteError } from "react-router-dom";
import styles from './errorpage.module.css';
import gif from '../../assets/error.gif'

const ErrorPage = () => {

    const error = useRouteError();
    const navigate = useNavigate();

    const handleOnclick = () => {
        navigate('/')
    }

    return(
        <div className={styles.error__page}>
            <img src={gif} alt="gif" />
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
            <i>{error.statusText || error.message}</i>
            </p>
            <button className={styles.error__button} onClick={handleOnclick}>Go to Homepage</button>
        </div>
    )
}

export default ErrorPage;