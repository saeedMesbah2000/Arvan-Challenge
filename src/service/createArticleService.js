import axios from "axios";
import apiPath from "./apiPath";

const createArticlesApi = async (user, articleBody) => {
  try {
    const url = `${apiPath.arvanCloud}/articles`;
    const config = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Token ${user.token}`,
    };
    const response = await axios.post(url, articleBody, { headers: config });

    return { data: response.data, status: true };
  } catch (error) {
    console.log(error.message);
    return { data: error.response.data.errors, status: false };
  }
};

export default createArticlesApi;
