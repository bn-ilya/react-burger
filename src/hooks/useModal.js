import { useCallback} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModal, clearHeader, clearMain } from "../services/reducers/modal";

export function useModal() {
    const dispatch = useDispatch();
    const {isModalOpen, headerModal, mainModal} = useSelector(state => state.modal.openModal);

    const openModal = useCallback(() => dispatch(setOpenModal(true)), [dispatch]);
    const closeModal = useCallback(() => {
        dispatch(setOpenModal(true))
        dispatch(clearHeader())
        dispatch(clearMain());
    }, [dispatch]);
    return { isModalOpen, openModal, closeModal, headerModal, mainModal }
}