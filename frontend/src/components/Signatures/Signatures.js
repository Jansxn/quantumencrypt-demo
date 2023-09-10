import './Signatures.css'
import { generateKyberKeys, getSignature, verifySignature } from "../KyberFunctions";
import {useState} from "react";

export default function Signatures() {
    var [privateKey, setPrivateKey] = useState([["Generate Private Key"]]);
    var [publicKey, setPublicKey] = useState(["Generate Public Key"]);
    var [message, setMessage] = useState("Message");
    var [signature, setSignature] = useState(["Signature"]);
    var [verified, setVerified] = useState("Verify");
    var [message2, setMessage2] = useState("Message");

    const updateKeys = async() =>{
        generateKyberKeys().then((pk_sk) => {
            // console.log(pk_sk);
            setPrivateKey(pk_sk[1]);
            setPublicKey(pk_sk[0]);
        });
    }

    const getSign = async() =>{
        getSignature(message, privateKey).then((sign) => {
            setSignature(sign.data.signed);
            // setSignature(sign);
        });
    }

    const verifySign = async() =>{
        verifySignature(message2, publicKey, signature).then((response) => {
            setVerified(response.data.message)
        });
    }

    return (
        <div className="signatures">
            <h1>Signatures</h1>

            <div className="signatures-sign box">
                <div className="b-title">Sign</div>
                Message
                <textarea className="b-value" onChange={(e) => setMessage(e.target.value)}>
                    Message
                </textarea>
                <br />

                Private Key
                <div className="multi-in">
                    <div className = "b-value sign-priv privkey">
                        {privateKey}
                    </div>
                    <button onClick={updateKeys} className="sign-button">Generate</button>
                </div>

                <button className = "sign-button main-button" onClick = {getSign}>Sign</button>
                <br />

                Signature
                <div className = "b-value">
                    {signature}
                </div>
            </div>

            <div className="signatures-verify box">
                <div className="b-title">Verify</div>
                Message
                <textarea className="b-value" onChange={(e) => setMessage2(e.target.value)}>
                    Message
                </textarea>
                <br />

                Public Key
                <div className = "b-value sign-pub pubkey">
                    {publicKey}
                </div>

                Signature
                <div className="b-value">
                    {signature}
                </div>
                <br />

                <button className = "sign-button main-button" onClick={verifySign}>{verified}</button>
            </div>      
        </div>
    );
}