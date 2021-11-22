import React, {useState} from 'react';
import "../../../src/styles/qrcode.css"
import QrCodeCanvas from './QRCodeCanvas';

const QRCodeContent = () => {

    const [url, setUrl] = useState();

    function generateQRCode(){
        let website = document.getElementById("website").value;
        console.log(website)
        if (website) {

          setUrl(website)

          document.getElementById("qrcode-container").style.display = "block";


        }
        else{
          alert("Please enter a valid URL");
        }
    }

    return (
        <div className="App">
          <div className="form">
            <input type="url" id="website" name="website"
                   placeholder="Example: https://google.com" required />
            <button type="button" onClick={generateQRCode}>
              Generate QR Code
            </button>

          <div id="qrcode-container">

            {url ?
            <>
              <QrCodeCanvas value = {url} foreground="#5868bf" />
            </>
            : null
            }

          </div>
        </div>
        </div>
      );
};

export default QRCodeContent;