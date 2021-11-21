import React from "react";
import { Card } from 'antd';
import img from '../img/SMP.png'
const { Meta } = Card;

const ClassCardSmp = () => {
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={ img } />}
        >
            <Meta title="Sisteme cu microprocesoare" description="
            Profesor: Cornel Popescu
            "/>
        </Card>
    )
};

export default ClassCardSmp;