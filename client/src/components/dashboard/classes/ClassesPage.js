import React, { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import { isAuthenticated } from "../../../auth";
import axios from "axios";
import { colors } from '../../../constants';
import { message, Spin } from "antd";

const ClassesPage = () => {
    const teacherId = isAuthenticated().user._id;
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchClasses = () => {
        return axios.get(`/api/teachers/${teacherId}/classes`)
            .then(response => setClasses(response.data))
            .catch(() => message.error('Couldn\'t fetch classes'));
    }

    useEffect(() => {
        fetchClasses().then(() => setLoading(false));
    }, []);

    return (
        <div className="content">
            {
                loading ?
                    <Spin size="large"/> :
                    <div id="classes-container">
                        {
                            classes.map((currentClass, index) => (
                                <ClassCard classObj={currentClass} color={colors[index % 6]}/>
                            ))
                        }
                    </div>
            }
        </div>
    );
};

export default ClassesPage;