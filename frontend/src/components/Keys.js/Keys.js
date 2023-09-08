import { generateKyberKeys } from "../KyberFunctions";
import {useState} from "react";

export default function Keys() {
    var [privateKey, setPrivateKey] = useState(["Generate Private Key"]);
    var [publicKey, setPublicKey] = useState(["Generate Public Key"]);

    const updateKeys = async() =>{
        generateKyberKeys().then((pk_sk) => {
            // console.log(pk_sk);
            setPrivateKey(pk_sk[0]);
            setPublicKey(pk_sk[1]);
        });
    }
    
    return (
        <div className="Keys">
            <h1>Public / Private Key Pairs</h1>
            <div className="Keys-Generate">
                <div className = "private key box">
                    <div className="b-title">Private</div>
                    <div className="b-value">
                        {privateKey.map((item, index) =>
                            <div key={index}>{item}, </div>)}
                    </div>
                </div>
                <div className = "public key box">
                    <div className="b-title">Public</div>
                    <div className="b-value">
                        {publicKey.map((item, index) =>
                            <div key={index}>{item}, </div>)}
                    </div>
                </div>
                <button onClick={updateKeys} className="box">Generate</button>
            </div>
        </div>
    );
}