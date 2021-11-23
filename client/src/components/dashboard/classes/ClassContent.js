import React from "react";
import { Button } from "antd";

const ClassContent = (props) => {
    const classId = props.classId;

    return (
        <div className="content">
            <Button type="primary">Generate QR</Button>
        </div>
    );
};

export default ClassContent