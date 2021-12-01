import React, { useEffect, useState } from 'react';
import { Button, message, Modal } from 'antd';
import axios from 'axios';
import QRCode from '../qr/QRCode';
import Text from 'antd/es/typography/Text';
import { QrcodeOutlined } from '@ant-design/icons';

const GenerateQR = (props) => {
    const [url, setUrl] = useState('');
    const [secondsToGo, setSecondsToGo] = useState(30);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [attempt, setAttempt] = useState(0);
    const [codeGenerationCount, setCodeGenerationCount] = useState(0);

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    };

    const generateQR = () => {
        axios.get(`/api/classes/${props.classId}/${attempt}/generate`)
            .then(response => setUrl(response.data))
            .catch(() => message.error('Could not generate QR code!'));
    };

    const getAttempt = () => {
        return axios.get(`/api/attendance/${props.classId}/${props.date}/attempt`)
            .then(response => setAttempt(response.data));
    };

    function destroyModal() {
        setModalVisibility(false);
    }

    useEffect(() => {
        if (secondsToGo <= 0) {
            setUrl('');
            setSecondsToGo(30);
            setCodeGenerationCount(codeGenerationCount + 1);

            if (codeGenerationCount === 1) {
                destroyModal();
                return;
            }
        }

        if (!url) {
            generateQR();
        }

        const intervalId = setInterval(() => {
            setSecondsToGo(secondsToGo - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [secondsToGo]);

    const openModal = () => {
        setSecondsToGo(30);
        setModalVisibility(true);
        getAttempt().then(() => setUrl(''));
    };

    return (
        <div id="content">
            <Button icon={<QrcodeOutlined/>} type="primary" onClick={openModal}>Generate QR</Button>

            <Modal title="Please scan QR" visible={modalVisibility} onCancel={destroyModal}
                   destroyOnClose={true}
                   footer={[
                       <Button key="back" onClick={toggleModalVisibility}>
                           Cancel
                       </Button>
                   ]}>
                This code will expire in {secondsToGo} second.
                <QRCode url={url}/>
                <Text>{url}</Text>
            </Modal>
        </div>
    );
};

export default GenerateQR;