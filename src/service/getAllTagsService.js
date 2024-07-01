import axios from "axios";
import apiPath from "./apiPath";

const getAllTagsApi = async (user) => {
  try {
    const url = `${apiPath.arvanCloud}/tags`;
    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    };

    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllTagsApi;
