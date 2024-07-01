import axios from "axios";
import apiPath from "./apiPath";

const getAllArticlesApi = async (user) => {
  try {
    const url = `${apiPath.arvanCloud}/articles`;
    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Token ${user.token}`,
    };

    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllArticlesApi;
