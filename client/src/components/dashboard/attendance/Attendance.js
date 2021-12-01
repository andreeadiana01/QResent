import React, { useEffect, useState } from 'react';
import { Button, Collapse, DatePicker, Empty } from 'antd';
import GenerateQR from '../classes/GenerateQR';
import AttendanceTable from './AttendanceTable';
import axios from 'axios';
import moment from 'moment';
import { ExportOutlined, LineChartOutlined } from '@ant-design/icons';
import StatisticsModal from './StatisticsModal';
import { isAuthenticated } from '../../../auth';

const { Panel } = Collapse;

const Attendance = (props) => {
    const [selectedDate, setSelectedDate] = useState(Date.now());
    const [loading, setLoading] = useState(true);
    const [loadAttendants, setLoadAttendants] = useState(false);
    const [attendances, setAttendances] = useState([]);
    const [attempts, setAttempts] = useState(0);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [studentsEnrolled, setStudentsEnrolled] = useState(0);

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    };

    const changeDate = (value) => {
        setSelectedDate(value._d.getTime());
        fetchAttendance().then(() => {
            setLoading(false);
            setLoadAttendants(true);
        });
    };

    const fetchAttendance = () => {
        return axios.get(`/api/attendance/${props.classId}/${selectedDate}`,
            { headers: { 'Content-Type': 'application/json' } })
            .then((response) => setAttendances(response.data))
            .then(() => {
                if (attendances.length === 0) {
                    setLoadAttendants(false);
                }
            });
    };

    useEffect(() => {
        fetchAttendance().then(() => getAttempt().then(() => {
            setLoading(false);
            setLoadAttendants(true);
        }));
        getStudentsEnrolled();
    }, [selectedDate]);

    const isToday = (date) => {
        const inputDate = new Date(date);
        const todaysDate = new Date();

        return inputDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0);
    };

    const getAttempt = () => {
        return axios.get(`/api/attendance/${props.classId}/${selectedDate}/attempt`)
            .then(response => setAttempts(response.data - 1));
    };

    const isTeacher = () => {
        return isAuthenticated().role === 'TEACHER';
    };

    const getStudentsEnrolled = () => {
        axios.get(`/api/classes/${props.classId}/students`, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => setStudentsEnrolled(response.data.length));
    };

    const exportCsv = () => {
        axios.get(`/api/attendance/${props.classId}/${selectedDate}/export`, { responseType: 'blob' })
            .then(response => {
                const currentDate = new Date(selectedDate);
                const day = currentDate.getDate();
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();

                const url = window.URL.createObjectURL(response.data);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;

                a.download = `attendants_${day}-${month}-${year}.csv`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            });
    };

    const getPanel = (i) => {
        const studentsPerAttempt = attendances.filter(student => student.attempt === i + 1);

        return (
            <Panel header={`Attempt ${i + 1}`} key={i + 1}>
                <AttendanceTable classId={props.classId} loading={loading} students={studentsPerAttempt}/>
            </Panel>
        );
    };

    return (
        <div className="content">
            <div id="attendance-header">
                <DatePicker allowClear={false} onChange={changeDate} defaultValue={moment()}/>
                {
                    isTeacher() ?
                        <div id="attendance-buttons">
                            {
                                isToday(selectedDate) && <GenerateQR classId={props.classId} date={selectedDate}/>
                            }
                            {
                                !!attendances.length &&
                                <Button icon={<LineChartOutlined/>} type="primary" onClick={toggleModalVisibility}>
                                    Statistics
                                </Button>
                            }
                            {
                                !!attendances.length &&
                                <Button icon={<ExportOutlined/>} type="primary" onClick={exportCsv}>
                                    Export CSV
                                </Button>
                            }
                        </div> :
                        <div id="attendance-buttons">
                            {
                                !!attendances.length &&
                                <Button icon={<LineChartOutlined/>} type="primary" onClick={toggleModalVisibility}>
                                    Statistics
                                </Button>
                            }
                        </div>
                }
            </div>

            {
                (!!attendances.length && isTeacher()) ?
                    <Collapse bordered={false} defaultActiveKey={['1']}>
                        {
                            Array.apply(0, Array(attempts)).map((x, i) => getPanel(i))
                        }
                    </Collapse> :
                    <Empty/>
            }

            {
                loadAttendants &&
                <StatisticsModal visible={modalVisibility} toggleModalVisibility={toggleModalVisibility}
                                 attempts={attempts} attendances={attendances} studentsCount={studentsEnrolled}/>
            }
        </div>
    );
};

export default Attendance;