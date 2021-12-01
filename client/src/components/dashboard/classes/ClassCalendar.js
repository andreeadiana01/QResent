import React, { useEffect, useState } from 'react';
import '../../../styles/class.scss';
import { Calendar } from 'antd';
import axios from 'axios';

const ClassCalendar = (props) => {
    const [attendances, setAttendances] = useState([]);
    const [selectedDate, setSelectedDate] = useState();

    function onChange(value) {
        setSelectedDate(value._d);
    }

    useEffect(() => {
        axios.get(`/api/attendance/${props.classId}`)
            .then(response => setAttendances(response.data));
    }, []);

    return (
        <div className="site-calendar-demo-card">
            <Calendar fullscreen={false} onChange={(value) => props.setDate(value)}/>
        </div>
    );
};

export default ClassCalendar;