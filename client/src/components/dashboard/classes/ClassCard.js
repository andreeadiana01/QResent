import React, { useEffect, useState } from 'react';
import '../../../styles/class.scss';
import { Card } from 'antd';
import { isAuthenticated } from '../../../auth';
import axios from 'axios';

const { Meta } = Card;

const ClassCard = (props) => {
    const [teacherName, setTeacherName] = useState('');

    useEffect(() => {
        axios.get(`/api/teachers/${props.classObj.teacherId}`)
            .then(response => setTeacherName(response.data.name))
            .catch(err => console.log(err));
    }, []);

    return (
        <Card
            onClick={() => window.location.href = `/classes/${props.classObj._id}`}
            hoverable
            className="class-card"
            cover={
                <div id="class-background" style={{ 'background-color': props.color }}>
                    <h1 className="class-title">{props.classObj.alias}</h1>
                </div>
            }
        >
            <Meta title={props.classObj.name}
                  description={isAuthenticated().role === 'STUDENT' && `Teacher: ${teacherName}`}/>
        </Card>
    );
};

export default ClassCard;