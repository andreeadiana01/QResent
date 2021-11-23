import React from "react";
import { Button, Modal } from "antd";
import SelectStudents from "./SelectStudents";

const SelectStudentsModal = (props) => {
    return (
        <Modal title="Select students" visible={props.visible} okText="Add" onOk={props.onOk}
               onCancel={props.toggleModalVisibility}
               destroyOnClose={true}
               footer={[
                   <Button key="back" onClick={props.toggleModalVisibility}>
                       Cancel
                   </Button>
               ]}
        >
            <SelectStudents classId={props.classId} updateTable={props.updateTable}/>
        </Modal>
    );
};

export default SelectStudentsModal;