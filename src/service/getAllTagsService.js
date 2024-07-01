import axios from "axios";
import apiPath from "./apiPath";

const getAllTagsApi = async (user) => {
  try {
    const response = await axios.get(apiPath.arvanCloud + "/tags", {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Token " + user.token,
    });

    return response.data;
  } catch (error) {
    alert(JSON.stringify(error.message));
  }
};

export default getAllTagsApi;
