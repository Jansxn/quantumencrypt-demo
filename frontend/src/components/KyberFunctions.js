import axios from "axios";

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
