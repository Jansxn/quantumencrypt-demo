function generateTransactions(txs){
    return txs.map((tx, i) => {
        return (
            <div className="block-tx" key={i}>
                <div className="flex">
                    <div className="block-info">Amt</div>
                    <input className="block-val" value={tx.amt} />
                    <div className="block-info">From</div>
                    <div className="block-val">{tx.from}</div>
                    <div className="block-info">To</div>
                    <div className="block-val">{tx.to}</div>
                </div>
                <div className="flex">
                    <div className="block-info">Signature</div>
                    <div className="block-val">{tx.signature}</div>
                </div>
            </div>
        )
    })
}

function Block(props){
    return(
        <div className={"block b" + props.block.toString()}>
            <div className="block-number">
                <div className="block-title">Block Number</div>
                <div className="block-val">{props.block}</div>
            </div>

            <div className="block-nonce">
                <div className="block-title">Nonce</div>
                <div className="block-val">{props.nonce}</div>
            </div>

            <div className="block-title">Coinbase</div>
            <div className="block-coinbase flex">
                <div className="block-info">Amt</div>
                <input className="block-val" value={props.coin.amt} />
                <div className="block-info">To</div>
                <div className="block-val">{props.coin.to}</div>
            </div>

            <div className="block-title">Transaction</div>
            <div className="block-txs">
                {generateTransactions(props.txs)}
            </div>

            <div className="block-prev">
                <div className="block-title">Previous Hash</div>
                <div className="block-val">{props.prevHash}</div>
            </div>

            <div className="block-hash">
                <div className="block-title">Hash</div>
                <div className="block-val">{props.hash}</div>
            </div>

            <button className="block-btn">Mine</button>
        </div>
    )
}

export default function Chain (){
    return(
        <div className="chain">
            <Block block={0} nonce={0} coin={{amt: 100, to: "Kyber"}} txs={[
                {
                    amt: 100,
                    from: "Kyber",
                    to: "Alice",
                },
                {
                    amt: 100,
                    from: "Kyber",
                    to: "Bob",
                }
            ]} prevHash={0} hash={0}/>

            <Block block={0} nonce={0} coin={{amt: 100, to: "Kyber"}} txs={[
                {
                    amt: 100,
                    from: "Kyber",
                    to: "Alice",
                },
                {
                    amt: 100,
                    from: "Kyber",
                    to: "Bob",
                }
            ]} prevHash={0} hash={0}/>
        </div>
    )
}