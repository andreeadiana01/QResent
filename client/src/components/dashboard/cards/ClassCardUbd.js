import React from "react";
import { Card } from 'antd';
import img from '../img/Ubd.png'
const { Meta } = Card;

const ClassCardUbd = () => {
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={ img } />}
        >
            <Meta title="Utilizarea bazelor de date" description="
            Profesor: Florin Anton
            "/>
        </Card>
    )
};

export default ClassCardUbd;