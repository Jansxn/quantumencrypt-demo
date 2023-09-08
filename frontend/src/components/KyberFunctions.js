import axios from "axios";

export const generateKyberKeys = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/generate", {});
      return response.data.gen;
    } catch (error) {
      return null;
    }
};

