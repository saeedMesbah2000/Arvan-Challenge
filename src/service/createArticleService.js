import axios from "axios";
import apiPath from "./apiPath";

let config = {
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
};

const createArticlesApi = async (user, newArticleData) => {
  try {
    debugger;
    const response = await axios.post(
      apiPath.arvanCloud + "/articles",
      newArticleData,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Token " + user.token,
        },
      }
    );
    debugger;

    return response.data;
  } catch (error) {
    alert(JSON.stringify(error.message));
  }
};

export default createArticlesApi;
