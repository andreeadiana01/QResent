import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../../auth';
import axios from 'axios';
import { Button, Empty, message, Modal, Select, TimePicker } from 'antd';
import GradingModal from './GradingModal';
import GradingTable from './GradingTable';
import moment from 'moment/moment';

const About = (props) => {
    const [grading, setGrading] = useState([]);
    const [schedule, setSchedule] = useState({});
    const [gradingModalVisibility, setGradingModalVisibility] = useState(false);
    const [scheduleModalVisibility, setScheduleModalVisibility] = useState(false);
    const [time, setTime] = useState('');
    const [day, setDay] = useState('');

    const toggleGradingModalVisibility = () => {
        setGradingModalVisibility(!gradingModalVisibility);
    };

    const toggleScheduleModalVisibility = () => {
        setScheduleModalVisibility(!scheduleModalVisibility);
    };

    const isTeacher = () => {
        return isAuthenticated().user.role === 'TEACHER';
    };

    const updateGrading = values => {
        axios.post(`/api/classes/${props.classId}/grading`, { grading: values.grading })
            .then(() => message.success('Grading updated!'))
            .catch(() => message.error('Cannot update grading'));
    };

    useEffect(() => {
        fetchGrading();
        fetchSchedule();
    }, []);

    const fetchGrading = () => {
        axios.get(`/api/classes/${props.classId}/grading`)
            .then(response => setGrading(response.data.grading))
            .catch(() => message.error('Couldn\'t get grading'));
    };

    const fetchSchedule = () => {
        axios.get(`/api/classes/${props.classId}/schedule`)
            .then(response => setSchedule(response.data.grading))
            .catch(() => message.error('Couldn\'t get grading'));
    };

    const changeTime = (time, timeString) => {
        setTime(timeString);
    };

    const changeDay = (value) => {
        setDay(value);
    };

    const configureSchedule = () => {
        axios.post(`/api/classes/${props.classId}/schedule`, { day: day, time: time })
            .then(response => {
                if (response.status === 200) {
                    message.success('Schedule set!');
                }
            })
            .catch(() => message.error('Couldn\'t set schedule'));
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    return (
        <div className="content">
            {
                isTeacher() &&
                <div id="attendance-buttons">
                    <Button type="primary" onClick={toggleGradingModalVisibility}>
                        Configure grading
                    </Button>
                    <Button type="primary" onClick={toggleScheduleModalVisibility}>
                        Configure schedule
                    </Button>
                </div>
            }
            {
                grading ?
                    <GradingTable grading={grading}/> :
                    <Empty description="No grading found. Please configure it!"/>
            }

            <GradingModal classId={props.classId} visible={gradingModalVisibility}
                          toggleModalVisibility={toggleGradingModalVisibility} onFinish={updateGrading}/>
            <Modal title="Please scan QR" visible={scheduleModalVisibility} onOk={configureSchedule}
                   onCancel={toggleScheduleModalVisibility}
                   destroyOnClose={true}>
                <Select onChange={changeDay} style={{ 'width': '10rem', 'margin-right': '1rem' }}>
                    {
                        days.map(day => (
                            <Select.Option value={day}>{day}</Select.Option>
                        ))
                    }
                </Select>
                <TimePicker onChange={changeTime} defaultValue={moment('12:08', 'HH:mm')} format={'HH:mm'}/>
            </Modal>

        </div>
    );
};

export default About;