import { useState } from "react"
import { generateKyberKeys, getSignature, verifySignature } from "../KyberFunctions";

export default function Transaction() {
    var [amts, setAmts] = useState(20);
    var [amtv, setAmtv] = useState(20);
    var [, setTosk] = useState(["0"]);
    var [topk, setTopk] = useState(["0"]);
    var [fromsk, setFromsk] = useState(["0"]);
    var [frompk, setFrompk] = useState(["0"]);
    var [signature, setSignature] = useState(["Signature"]);
    var [verified, setVerified] = useState("Verify");

    const updateKeysTo = async() =>{
        generateKyberKeys().then((pk_sk) => {
            // console.log(pk_sk);
            setTosk(pk_sk[1]);
            setTopk(pk_sk[0]);
        });
    }
    const updateKeysFrom = async() =>{
        generateKyberKeys().then((pk_sk) => {
            // console.log(pk_sk);
            setFromsk(pk_sk[1]);
            setFrompk(pk_sk[0]);
        });
    }

    const getSign = async() =>{
        var message = amts.toString() + topk + frompk;
        // console.log(message);
        getSignature(message, fromsk).then((sign) => {
            setSignature(sign.data.signed);
            // setSignature(sign);
            // console.log(signature);
        });
    }

    const verifySign = async() =>{
        var message = amtv.toString() + topk + frompk;
        console.log(message);
        verifySignature(message, frompk, signature).then((response) => {
            setVerified(response.data.message)
        });
    }

    return (
        <div className="transaction">
            <h1>Transaction</h1>
            <div className="transaction-box box">

                <div className="b-title">Sign</div>

                Message
                <div className="multi-in reverse">
                    <input type="text" className = "b-value sign-priv privkey" onChange={(e) => setAmts(e.target.value)} />
                    <button className="sign-button">Amt</button>
                </div>
                <div className="multi-in reverse">
                    <div type="text" className = "b-value sign-priv privkey">{topk}</div>
                    <button className="sign-button" onClick={updateKeysTo}>To</button>
                </div>
                <div className="multi-in reverse">
                    <div type="text" className = "b-value sign-priv privkey">{frompk}</div>
                    <button className="sign-button" onClick={updateKeysFrom}>From</button>
                </div>
                <br />

                Private Key
                <div className = "b-value">{fromsk}</div>

                <button className = "sign-button main-button" onClick={getSign}>Sign</button>
                <br />

                Signature
                <div className = "b-value">{signature}</div>

            </div>

            <div className="transaction-box box">

                <div className="b-title">Verify</div>

                Message
                <div className="multi-in reverse">
                    <input type="text" className = "b-value sign-priv privkey" onChange={(e) => setAmtv(e.target.value)} />
                    <button className="sign-button">Amt</button>
                </div>
                <div className="multi-in reverse">
                    <div type="text" className = "b-value sign-priv privkey">{topk}</div>
                    <button className="sign-button" onClick={updateKeysTo}>To</button>
                </div>
                <div className="multi-in reverse">
                    <div type="text" className = "b-value sign-priv privkey">{frompk}</div>
                    <button className="sign-button" onClick={updateKeysFrom}>From</button>
                </div>
                <br />

                Signature
                <div className = "b-value">{signature}</div>
                <button className = "sign-button main-button" onClick={verifySign}>{verified}</button>
            </div>
        </div>
    )
}