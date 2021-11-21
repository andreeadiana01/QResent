import React from "react";
import { Card } from 'antd';
import img from '../img/Mps.png'
const { Meta } = Card;

const ClassCardMps = () => {
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={ img } />}
        >
            <Meta title="Managementul Proiectelor Software" description="
            Profesor: Boiangiu Anton Costin
            "/>
        </Card>
    )
};

export default ClassCardMps;