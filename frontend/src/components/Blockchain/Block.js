import { useEffect , useState} from "react"
import { generateKyberKeys, getSignature, verifySignature } from "../KyberFunctions";
import { sha256 } from "js-sha256";

function mine(event, blockno, user){
    event.preventDefault();
    var maximumNonce = 500000;

    console.log("mining block " + blockno.toString() + " for user " + user.toString());
    var nonceVal = "0";
    var coinbaseVal = document.getElementsByClassName("block-coin-val"+blockno.toString()+user)[0].value;
    var txsVal = document.getElementsByClassName("block-txs-amt"+blockno.toString()+user);
    var txs = [];
    if (txsVal.length !== 0){
        for (let i = 0; i < txsVal.length; i++){
            txs.push(txsVal[i].value);
        }
    }

    var message = nonceVal.toString() + coinbaseVal.toString() + txs.toString();

    console.log(message);
    for (var i =0 ;i<maximumNonce;i++){
        var hash = sha256(message + i.toString());
        if (hash.substring(0,4) === "0000"){
            // console.log("nonce found: " + i.toString());
            console.log("hash found: " + hash);
            document.getElementsByClassName("block-nonce-val"+blockno.toString()+user)[0].value = i.toString();
            document.getElementsByClassName("block-hash"+blockno.toString()+user)[0].innerHTML = hash;
            break;
        }
    }
}

function Block(props){
    // console.log(props.block.toString());
    var [hash, setHash] = useState("0");

    function updateCurrHash(){
        try{
            var nonceVal = document.getElementsByClassName("block-nonce-val"+props.block.toString()+props.user)[0].value;
            var coinbaseVal = document.getElementsByClassName("block-coin-val"+props.block.toString()+props.user)[0].value;
            var txsVal = document.getElementsByClassName("block-txs-amt"+props.block.toString()+props.user);
            var txs = [];
            if (txsVal.length !== 0){
                for (let i = 0; i < txsVal.length; i++){
                    txs.push(txsVal[i].value);
                }
            }
            var message = "0" + coinbaseVal.toString() + txs.toString();
            setHash(sha256(message + nonceVal.toString()));
            return sha256(message + nonceVal.toString());
        }
        catch{
            setHash("0");
            return "0";
        }
    }

    function generateTransactions(txs, blockno, user){
        return txs.map((tx, i) => {
            // var message = tx.amt.toString() + tx.to + tx.from;
            // console.log(message);
            var signatures = [
                '30460221008aa13eb403bbaecbbefe36d3df2f3fc04fbee6c930f689eef1e54438957b476a0221008e72503ffaeb7f2d146a7f213b6974de03965c45d56b222f1b7a22640ce87cd9',
                '304402201d97c65bafaf61ae46717c87757772860cd1b130e5786085f82bef5b98293c2a02200d230c4c690af60c76ed57fd23c92d45d758f5c2325ee3e326d1c98fe0b769f4',
                '3046022100c583bd79baf55bd5580761a236a7e2f65b80ae3e4ebb4eb620e6a472156b95d1022100b65511d1eaa63f3cda18b78301e4945772fbddee08903acd65e4a97f57e85c55',
                '30450220485a5a1c317d5a1b33af90201999909b49e09dc5f0b261048bbee1d09ed1735f02210081eb6d39ab4db5d9f95ec5b103b7a6268bc936c738cb05293e167220fbc3b71e',
                '3044022013a30405cc52560bcfa5348955303bad54e235f1504d65e356403f41e60867d50220539fc0bcd0ec869f08ed10987188f3333c9d7050af7ac5cf239c3cab38a4e46f'
            ]
            var signatur = signatures[i];
            return (
                <div className="block-tx" key={i}>
                    <div className="flex">
                        <div className="block-info">Amt</div>
                        <input className={"block-val block-txs-amt" + blockno.toString()+user} defaultValue={tx.amt} onChange={updateCurrHash}/>
                        <div className="block-info">From</div>
                        <div className="block-val">{tx.from}</div>
                        <div className="block-info">To</div>
                        <div className="block-val">{tx.to}</div>
                    </div>
                    <div className="flex">
                        <div className="block-info">Signature</div>
                        <div className="block-val">{signatur}</div>
                    </div>
                </div>
            )
        })
    }
    
    return(
        <div className={"block b" + props.block.toString()}>

            <div className="block-main">
                <div className="block-number">
                    <div className="block-title">Block Number</div>
                    <div className="block-val">{props.block}</div>
                </div>

                <div className="block-nonce">
                    <div className="block-title">Nonce</div>
                    <input className={"block-val block-nonce-val"+props.block.toString()+props.user} defaultValue = {props.nonce} onChange={updateCurrHash}/>
                </div>
            </div>

            <div className="block-title">Coinbase</div>
            <div className="block-coinbase flex">
                <div className="block-info">Amt</div>
                <input className={"block-val block-coin-val" +props.block.toString()+props.user} defaultValue={props.coin.amt} onChange={updateCurrHash}/>
                <div className="block-info">To</div>
                <div className="block-val">{props.coin.to}</div>
            </div>

            <div className="block-title">Transaction</div>
            <div className="block-txs">
                {generateTransactions(props.txs, props.block, props.user)}
            </div>

            <div className="block-prev">
                <div className="block-title">Previous Hash</div>
                <div className="block-val">{0}</div>
            </div>

            <div className="block-hash">
                <div className="block-title">Hash</div>
                <div className={"block-val block-hash"+props.block.toString()+props.user}>{hash}</div>
            </div>

            <button className="block-btn" onClick={(e) => mine(e, props.block, props.user)}>Mine</button>
        </div>
    )
}

export default function Chain (props){
    var pks = props.keys[0];
    var sks = props.keys[1];

    return(
        <div className="chain-holder">
            <div className="blockchain-title">
                <div className = "chain-title">Peer {props.user}</div>
                {/* <button className="generate-keys" onClick={generateKeys}>Generate Keys</button> */}
            </div>
            <div className="chain">
                <Block block={0} nonce={0} coin={{amt: 100, to: pks[0]}} txs={[

                ]} prevHash={0} user={props.user}/>

                <Block block={1} nonce={0} coin={{amt: 100, to: pks[0]}} txs={[
                    {
                        amt: 10,
                        from: pks[0],
                        to: pks[1],
                        sk: sks[0],
                    },
                    {
                        amt: 20,
                        from: pks[0],
                        to: pks[2],
                        sk: sks[0],
                    },
                    {
                        amt: 15,
                        from: pks[0],
                        to: pks[3],
                        sk: sks[0],
                    },
                    {
                        amt: 15,
                        from: pks[0],
                        to: pks[4],
                        sk: sks[0],
                    },
                ]} prevHash={0} user={props.user}/>

                <Block block={2} nonce={0} coin={{amt: 100, to: pks[0]}} txs={[
                    {
                        amt: 10,
                        from: pks[3],
                        to: pks[5],
                        sk: sks[3],
                    },
                    {
                        amt: 5,
                        from: pks[4],
                        to: pks[5],
                        sk: sks[4],
                    },
                    {
                        amt: 20,
                        from: pks[2],
                        to: pks[6],
                        sk: sks[2],
                    }
                ]} prevHash={0} user={props.user}/>

                <Block block={3} nonce={0} coin={{amt: 100, to: pks[0]}} txs={[
                    {
                        amt: 7,
                        from: pks[5],
                        to: pks[7],
                        sk: sks[5],
                    },
                    {
                        amt: 5,
                        from: pks[3],
                        to: pks[4],
                        sk: sks[3],
                    },
                    {
                        amt: 8,
                        from: pks[1],
                        to: pks[5],
                        sk: sks[1],
                    }
                ]} prevHash={0}  user={props.user}/>
            </div>
        </div>
    )
}