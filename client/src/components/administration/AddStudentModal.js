import React from 'react';
import { Button, Modal } from 'antd';
import AddStudentForm from "./AddStudentForm";

const AddStudentModal = (props) => {
    return (
        <Modal title="Basic Modal" visible={props.visible} okText="Add" onOk={props.onOk}
               onCancel={props.toggleModalVisibility}
               footer={[
                   <Button key="back" onClick={props.toggleModalVisibility}>
                       Cancel
                   </Button>
               ]}
        >
            <AddStudentForm/>
        </Modal>
    );
};

export default AddStudentModal;