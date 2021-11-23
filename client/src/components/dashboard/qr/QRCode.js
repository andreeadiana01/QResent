import React from 'react';
import QrCodeCanvas from './QRCodeCanvas';

const QRCode = (props) => {
    return (
        <div>
            {props.url && <QrCodeCanvas value={props.url} foreground="#000000" size='300'/>}
        </div>
    );
};

export default QRCode;