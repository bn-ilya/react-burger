import { selectUserDataFetch } from "../../../../services/selectors";
import { useSelector, useDispatch } from "react-redux";
import styles from './profile-form.module.css';
import Inputs from "./inputs/inputs";
import Controls from "./controls/controls";
import { useState, useEffect } from "react"
import { selectUserData } from "../../../../services/selectors";
import SceletonLoader from "./sceleton-loader/sceleton-loader";
import { updateUserData } from "../../../../services/reducers/profile";
import { openModal } from "../../../../services/reducers/modal";

export default function ProfileForm() {
    const dispatch = useDispatch()
    const { request, failed } = useSelector(selectUserDataFetch);
    const { name, email } = useSelector(selectUserData);
    const password = '';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        setFormData({ ...formData, name, email })
    }, [name, email,])

    useEffect(() => {
        if (
            name !== formData.name ||
            email !== formData.email ||
            password !== formData.password
        ) {
            setShowControls(true)
        } else {
            setShowControls(false)
        }
    }, [formData, name, email, password])

    const save = async () => {
        const res = await dispatch(updateUserData({name: formData.name, email: formData.email, password: formData.password}))
        console.log(res);
    }

    const cancel = () => {
        setFormData({ name, email, password })
    }

    if (request) return <SceletonLoader />
    if (failed) dispatch(openModal({ content: "", type: "error" }))

    return (
        <form className={styles.form}>
            <h1 className={'text text_type_main-medium ' + styles.title}>Вход</h1>
            <Inputs formData={formData} setFormData={setFormData} />
            {showControls && <Controls cancel={cancel} save={save} />}
        </form>
    )
}