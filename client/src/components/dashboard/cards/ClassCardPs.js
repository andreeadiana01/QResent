import React from "react";
import { Card } from 'antd';
import img from '../img/PS.png'
const { Meta } = Card;

const ClassCardPs = () => {
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={ img } />}
        >
            <Meta title="Procesarea semnalelor" description="
            Profesor: Marios Choudary
            "/>
        </Card>
    )
};

export default ClassCardPs;