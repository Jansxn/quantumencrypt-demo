import axios from "axios";
import { sha256 } from "js-sha256";

export const mine = (event, blockno, user) => {
  event.preventDefault();
  var maximumNonce = 500000;

  console.log("mining block " + blockno.toString() + " for user " + user.toString());
  var nonceVal = "0";
  var coinbaseVal = document.getElementsByClassName("block-coin-val"+blockno.toString()+user)[0].value;
  var txsVal = document.getElementsByClassName("block-txs-amt"+blockno.toString()+user);
  var prevHashVal
  if (blockno!== 0) prevHashVal = document.getElementsByClassName("block-hash"+(blockno-1).toString()+user)[0].innerHTML;
  else prevHashVal = "0";
  document.getElementsByClassName("b"+(blockno).toString()+user)[0].style.backgroundColor = "rgb(130, 240, 130)";
  var txs = [];
  if (txsVal.length !== 0){
      for (let i = 0; i < txsVal.length; i++){
          txs.push(txsVal[i].value);
      }
  }

  var message = nonceVal.toString() + coinbaseVal.toString() + txs.toString() + prevHashVal.toString();

  console.log(message);
  for (var i =0 ;i<maximumNonce;i++){
      var hash = sha256(message + i.toString());
      if (hash.substring(0,4) === "0000"){
          // console.log("nonce found: " + i.toString());
          console.log("hash found: " + hash);
          document.getElementsByClassName("block-nonce-val"+blockno.toString()+user)[0].value = i.toString();
          document.getElementsByClassName("block-hash"+blockno.toString()+user)[0].innerHTML = hash;
          if (blockno+1 <= 3)document.getElementsByClassName("block-prevhash"+(blockno+1).toString()+user)[0].innerHTML = hash;
          if (blockno !== 0) document.getElementsByClassName("block-prevhash"+blockno.toString()+user)[0].innerHTML = document.getElementsByClassName("block-hash"+(blockno-1).toString()+user)[0].innerHTML;
          break;
      }
  }
}

export const generateKyberKeys = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/generate", {});
      var ret = [response.data.pk, response.data.sk];
      // console.log(ret);
      return ret;
    } catch (error) {
      return null;
    }
};

export const getSignature = async (message, sk) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/sign_message", {
      message,
      sk,
    });
    return response
  } catch (error) {
    console.error(error);
  }
};


export const verifySignature = async (message, pk, signed) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/verify_signature", {
      message,
      pk,
      signed
    });
    console.log(response.data.message)
    return response
  } catch (error) {
    console.error(error);
  }
};


export function generateKeys(e){
  e.preventDefault();

for (var blockno = 0; blockno <= 3; blockno++){
  var users = ["A", "B", "C"];
  for (var i = 0; i < users.length; i++){
      var user = users[i];
      mine(e, blockno, user);
  }
}
}