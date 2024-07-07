import axios from "axios";
import apiPath from "./apiPath";

const createArticlesApi = async (user, slug, articleBody) => {
  try {
    const url = `${apiPath.arvanCloud}/articles/${slug}`;
    const config = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Token ${user.token}`,
    };

    const response = await axios.put(url, articleBody, { headers: config });

    return { data: response.data, status: true };
  } catch (error) {
    console.log(error.message);
    return { data: error.response.data.errors, status: false };
  }
};

export default createArticlesApi;
