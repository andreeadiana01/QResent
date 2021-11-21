import React from "react";
import { Card } from 'antd';
import img from '../img/SI.png'
const { Meta } = Card;

const ClassCardSI = () => {
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={ img } />}
        >
            <Meta title="Sisteme incorporate" description="
            Profesor: Dan Stefan Tudose
            "/>
        </Card>
    )
};

export default ClassCardSI;