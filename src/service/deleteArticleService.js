import axios from "axios";
import apiPath from "./apiPath";

const deleteArticleApi = async (articleSlug, user) => {
  try {
    debugger;
    const response = await axios.delete(
      apiPath.arvanCloud + `/articles/${articleSlug}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Token " + user.token,
        },
      }
    );
    debugger;
    return response;
  } catch (error) {
    alert(JSON.stringify(error.message));
  }
};

export default deleteArticleApi;
