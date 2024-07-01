import axios from "axios";
import apiPath from "./apiPath";

let config = {
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
};

const createArticlesApi = async (user, slug, articleBody) => {
  try {
    debugger;
    const response = await axios.put(
      apiPath.arvanCloud + `/articles/${slug}`,
      articleBody,
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
