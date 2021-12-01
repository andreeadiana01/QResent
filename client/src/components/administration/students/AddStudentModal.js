import React from 'react';
import { Button, Modal } from 'antd';
import AddStudentForm from './AddStudentForm';

const AddStudentModal = (props) => {
    return (
        <Modal title="Add Student" visible={props.visible} okText="Add" onOk={props.onOk}
               onCancel={props.toggleModalVisibility}
               destroyOnClose={true}
               footer={[
                   <Button key="back" onClick={props.toggleModalVisibility}>
                       Cancel
                   </Button>
               ]}
        >
            <AddStudentForm onAdd={props.onOk}/>
        </Modal>
    );
};

export default AddStudentModal;