import axios from "axios";
import apiPath from "./apiPath";

let config = {
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
};

const getAllArticlesApi = async (user) => {
  try {
    const response = await axios.get(apiPath.arvanCloud + "/articles", {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Token " + user.token,
    });

    return response.data;
  } catch (error) {
    alert(JSON.stringify(error.message));
  }
};

export default getAllArticlesApi;
