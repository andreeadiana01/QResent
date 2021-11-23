import React, { useState } from "react";
import { Button, message } from "antd";
import axios from "axios";
import GenerateQR from "./GenerateQR";
import Attendance from "../Attendance";

const ClassContent = (props) => {
    return (
        <div className="content">
            <GenerateQR classId={props.classId}/>
            <Attendance/>
        </div>
    );
};

export default ClassContent