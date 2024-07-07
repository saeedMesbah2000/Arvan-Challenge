import axios from "axios";
import apiPath from "./apiPath";

const deleteArticleApi = async (articleSlug, user) => {
  try {
    const url = `${apiPath.arvanCloud}/articles/${articleSlug}`;
    const config = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Token ${user.token}`,
    };

    const response = await axios.delete(url, { headers: config });

    return { data: response.data, status: true };
  } catch (error) {
    console.log(error.message);
    return { data: error.response.data.errors, status: false };
  }
};

export default deleteArticleApi;
