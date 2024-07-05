import axios from "axios";
import apiPath from "./apiPath";

let config = {
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Accept: "*/*",
  },
};

const registerApi = async (userObject) => {
  try {
    const response = await axios.post(
      apiPath.arvanCloud + "/users",
      userObject,
      { headers: config }
    );
    debugger;
    return { data: response.data, status: true };
  } catch (error) {
    console.log(error.message);
    return { data: error.response.data.errors, status: false };
  }
};

export default registerApi;
