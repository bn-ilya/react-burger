import { Link } from 'react-router-dom';
import styles from './additional-actions-form.module.css';

export default function AdditionalActionsForm({additionalActions}) {
    return(
        <div className={styles.content}>
            {additionalActions.map((additionalAction, index)=>(
                <span key={index} className='text text_type_main-default text_color_inactive'>{additionalAction.text} <Link to={additionalAction.link} className={styles.link}>{additionalAction.linkText}</Link></span>
            ))}
        </div>
    )
}