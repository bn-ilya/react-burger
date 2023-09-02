import Header from "../../components/header/header";
import ContainerPage from "../../components/container-page/container-page";
import Main from "./main/main";
import { useDispatch } from 'react-redux';
import { getUserData } from "../../utils/burger-api";
import { useEffect } from 'react';

export default function ProfilePage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData());
    }, []);

    return (
        <ContainerPage>
            <Header />
            <Main />
        </ContainerPage>
    )
}