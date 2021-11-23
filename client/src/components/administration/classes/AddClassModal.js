import React from "react";
import { Button, Modal } from "antd";
import AddClassForm from "./AddClassForm";

const AddClassModal = (props) => {
    return (
        <Modal title="Add Class" visible={props.visible} okText="Add" onOk={props.onOk}
               onCancel={props.toggleModalVisibility}
               destroyOnClose={true}
               footer={[
                   <Button key="back" onClick={props.toggleModalVisibility}>
                       Cancel
                   </Button>
               ]}
        >
            <AddClassForm onAdd={props.onAdd}/>
        </Modal>
    );
};

export default AddClassModal;