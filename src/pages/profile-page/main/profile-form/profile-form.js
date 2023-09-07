import { selectUserDataFetch } from "../../../../services/selectors";
import { useSelector, useDispatch } from "react-redux";
import styles from './profile-form.module.css';
import Inputs from "./inputs/inputs";
import Controls from "./controls/controls";
import { useState, useEffect, useCallback } from "react"
import { selectUserData } from "../../../../services/selectors";
import SceletonLoader from "./sceleton-loader/sceleton-loader";
import { updateUserData } from "../../../../services/reducers/profile";
import { openModal } from "../../../../services/reducers/modal";


export default function ProfileForm() {
    const dispatch = useDispatch();
    const { request, failed } = useSelector(selectUserDataFetch);
    const { name, email } = useSelector(selectUserData);
    const password = '';

    const [formData, setFormData] = useState({
        name: name,
        email: email,
        password: ''
    })
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        if (request) return;
        if (
            name !== formData.name ||
            email !== formData.email ||
            password !== formData.password
        ) {
            setShowControls(true)
        } else {
            showControls && setShowControls(false)
        }
    }, [formData, name, email, password, showControls])

    const save = async () => {
        try {
            await dispatch(updateUserData({...formData})).unwrap();
        } catch (error) {
            dispatch(openModal({ content: error.message, type: 'error' }))
        }
    }

    const cancel = useCallback(() => {
        setFormData({ name, email, password })
    }, [name, email, password])

    const handleSubmitForm = e => {
        e.preventDefault();
        e.stopPropagation();
        save();
    }

    if (request) return <SceletonLoader />
    if (failed) dispatch(openModal({ content: "", type: "error" }))

    return (
        <form className={styles.form} onSubmit={handleSubmitForm}>
            <h1 className={'text text_type_main-medium ' + styles.title}>Вход</h1>
            <Inputs formData={formData} setFormData={setFormData} />
            {showControls && <Controls cancel={cancel} />}
        </form>
    )
}