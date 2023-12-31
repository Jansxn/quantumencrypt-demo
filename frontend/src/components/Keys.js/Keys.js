import { generateKyberKeys } from "../KyberFunctions";
import {useState} from "react";
import './Keys.css';

export default function Keys() {
    var [privateKey, setPrivateKey] = useState(["Generate Private Key"]);
    var [publicKey, setPublicKey] = useState(["Generate Public Key"]);

    const updateKeys = async() =>{
        generateKyberKeys().then((pk_sk) => {
            // console.log(pk_sk);
            setPrivateKey(pk_sk[1]);
            setPublicKey(pk_sk[0]);
        });
    }
    
    return (
        <div className="Keys">
            <h1>Public / Private Key Pairs</h1>
            <div className="Keys-Generate">
                <div className = "private key box">
                    <div className="b-title">Private</div>
                    <div className="b-value privkey">
                        {privateKey}
                    </div>
                </div>
                <div className = "public key box">
                    <div className="b-title">Public</div>
                    <div className="b-value">
                        {publicKey}
                    </div>
                </div>
                <button onClick={updateKeys} className="box key-button">Generate</button>
            </div>
        </div>
    );
}