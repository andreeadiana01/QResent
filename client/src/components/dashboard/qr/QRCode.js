import React, { useState } from 'react';
import "../../../styles/qrcode.css"
import QrCodeCanvas from './QRCodeCanvas';

const QRCode = (props) => {
    return (
        <div className="App">
                <div id="qrcode-container">
                    {props.url && <QrCodeCanvas value={props.url} foreground="#000000" size='300'/>}
                </div>
        </div>
    );
};

export default QRCode;