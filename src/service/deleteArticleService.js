import axios from "axios";
import apiPath from "./apiPath";

const deleteArticleApi = async (articleSlug, user) => {
  try {
    const url = `${apiPath.arvanCloud}/articles/${articleSlug}`;
    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Token ${user.token}`,
    };

    const response = await axios.delete(url, { headers });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteArticleApi;
