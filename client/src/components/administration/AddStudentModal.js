import React from 'react';
import { Modal } from 'antd';
import AddStudentForm from "./AddStudentForm";

const AddStudentModal = (props) => {
    const handleOk = () => {

    }

    return (
        <Modal title="Basic Modal" visible={props.visible} okText="Add" onOk={handleOk}
               onCancel={props.toggleModalVisibility}>
            <AddStudentForm/>
        </Modal>
    );
};

export default AddStudentModal;