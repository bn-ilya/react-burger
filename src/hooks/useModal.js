import { useCallback, useState } from "react";

export function useModal({bool}) {
    const [isModalOpen, setIsOpenModal] = useState(bool);

    const openModal = useCallback(() => setIsOpenModal(true), []);
    const closeModal = useCallback(() => setIsOpenModal(false), []);
    return {isModalOpen, openModal, closeModal}
}