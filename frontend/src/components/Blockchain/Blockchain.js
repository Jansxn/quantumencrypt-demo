import { generateKyberKeys, getSignature, verifySignature } from "../KyberFunctions";
import {useState} from "react";
import Chain from "./Block";
import './Blockchain.css'

export default function Blockchain (){
    return(
        <div>
            <h1>Blockchain</h1>
            <Chain />
        </div>
    )
}