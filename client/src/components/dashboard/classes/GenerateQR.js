import React, { useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import axios from "axios";
import QRCode from "../qr/QRCode";
import Text from "antd/es/typography/Text";

const GenerateQR = (props) => {
    const [url, setUrl] = useState('');
    const [secondsToGo, setSecondsToGo] = useState(60);
    const [modalVisibility, setModalVisibility] = useState(false);

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    }

    const generateQR = () => {
        axios.get(`/api/classes/${props.classId}/generate`)
            .then(response => setUrl(response.data))
            .catch(() => message.error('Could not generate QR code!'));
    }

    function destroyModal() {
        setModalVisibility(false);
    }

    useEffect(() => {
        if (secondsToGo <= 0) {
            setUrl('');
            setSecondsToGo(60);
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
        setSecondsToGo(60);
        setModalVisibility(true);
        setUrl('');
    }

    return (
        <div id="content">
            <Button type="primary" onClick={openModal}>Generate QR</Button>

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
}

export default GenerateQR;