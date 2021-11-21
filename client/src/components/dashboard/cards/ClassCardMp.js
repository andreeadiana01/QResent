import React from "react";
import { Card } from 'antd';
import img from '../img/MP.png'
const { Meta } = Card;

const ClassCardMP = () => {
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={ img } />}
        >
            <Meta title="Managementul proiectelor" description="
            Profesoara: Marcu Costina Iustina -> assigned to me
            "/>
        </Card>
    )
};

export default ClassCardMP;