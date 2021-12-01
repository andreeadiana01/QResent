import React from 'react';
import { Button, Card, Modal, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import _ from 'lodash';

const StatisticsModal = (props) => {
    const getStudentsByAttempt = () => {
        let studentsPerAttempt = [];

        if (!props.attendances.length) {
            return [];
        }

        for (let i = 0; i < props.attempts; i++) {
            studentsPerAttempt[i] = props.attendances.filter(student => student.attempt === i + 1);
        }

        return studentsPerAttempt;
    };

    const getStatistic = () => {
        const cards = [];
        const studentsPerAttempt = getStudentsByAttempt();

        if (!studentsPerAttempt.length) {
            return cards;
        }

        cards.push(
            <Card>
                <Statistic
                    title={`Students / Attempt 1`}
                    value={studentsPerAttempt[0].length}
                    valueStyle={{ color: '#1890FF' }}
                    suffix={`/ ${props.studentsCount}`}
                />
            </Card>
        );

        for (let i = 1; i < props.attempts; i++) {
            const color = (studentsPerAttempt[i].length > studentsPerAttempt[i - 1].length) ? '#3f8600' : '#cf1322';
            const arrow = (studentsPerAttempt[i].length > studentsPerAttempt[i - 1].length) ?
                <ArrowUpOutlined/> :
                <ArrowDownOutlined/>;

            cards.push(
                <Card>
                    <Statistic
                        title={`Students / Attempt ${i + 1}`}
                        value={studentsPerAttempt[i].length}
                        valueStyle={{ color: color }}
                        prefix={arrow}
                        suffix={`/ ${props.studentsCount}`}
                    />
                </Card>
            );
        }

        return cards;
    };

    const getAttendingStudents = () => {
        return props.attendances.filter(student => student.attempt === 1).length;
    };

    const getActiveStudents = () => {
        const studentsPerAttempt = getStudentsByAttempt();

        if (!studentsPerAttempt.length) {
            return [];
        }

        const studentsBeginning = studentsPerAttempt[0];
        const studentsMiddle = studentsPerAttempt[1];
        const studentsFinal = studentsPerAttempt[studentsPerAttempt.length - 1];

        const studentsActiveBeginning = studentsBeginning.filter(item1 =>
            studentsMiddle.some(item2 => item1.studentId === item2.studentId));

        const studentsActiveEnd = studentsFinal.filter(item1 =>
            studentsMiddle.some(item2 => item1.studentId === item2.studentId));

        return _.union(studentsActiveBeginning, studentsActiveEnd);
    };

    const getFullyActiveStudents = () => {
        const studentsPerAttempt = getStudentsByAttempt();

        if (!studentsPerAttempt.length) {
            return 0;
        }

        const studentsBeginning = studentsPerAttempt[0];
        const studentsMiddle = studentsPerAttempt[1];
        const studentsFinal = studentsPerAttempt[studentsPerAttempt.length - 1];

        const studentsActiveBeginning = studentsBeginning.filter(item1 =>
            studentsMiddle.some(item2 => item1.studentId === item2.studentId));

        const studentsActiveEnd = studentsFinal.filter(item1 =>
            studentsMiddle.some(item2 => item1.studentId === item2.studentId));

        return studentsActiveBeginning.filter(item1 =>
            studentsActiveEnd.some(item2 => item1.studentId === item2.studentId)).length;
    };

    return (
        <Modal title="Statistics" visible={props.visible}
               width={800}
               onCancel={props.toggleModalVisibility}
               destroyOnClose={true}
               footer={[
                   <Button key="back" onClick={props.toggleModalVisibility}>
                       Cancel
                   </Button>
               ]}
        >
            <div>
                <div className="statistics">
                    {
                        getStatistic()
                    }
                </div>
                <div className="statistics">
                    <Card>
                        <Statistic title={'Attending students'} value={getAttendingStudents()}
                                   suffix={`/ ${props.studentsCount}`}/>
                    </Card>
                    <Card>
                        <Statistic title={'Active students'} value={getActiveStudents().length}
                                   suffix={`/ ${props.studentsCount}`}/>
                    </Card>
                    <Card>
                        <Statistic title={'Fully active students'} value={getFullyActiveStudents()}
                                   suffix={`/ ${props.studentsCount}`}/>
                    </Card>
                </div>
            </div>

        </Modal>
    );
};

export default StatisticsModal;