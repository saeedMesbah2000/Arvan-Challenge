import axios from "axios";
import apiPath from "./apiPath";

const createArticlesApi = async (user, slug, articleBody) => {
  try {
    const url = `${apiPath.arvanCloud}/articles/${slug}`;
    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Token ${user.token}`,
    };

    const response = await axios.put(url, articleBody, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default createArticlesApi;
