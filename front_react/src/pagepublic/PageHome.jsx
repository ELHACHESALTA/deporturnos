import React from "react";
import Modal from "../components/Modal/Modal";
import { useModal } from "../hooks/useModal";

const PageHome = () => {

    const [isOpenModal, openModal, closeModal] = useModal(false);

    return (
        <div className="flex-grow">
            PageHome
        </div>
    )
}

export default PageHome;