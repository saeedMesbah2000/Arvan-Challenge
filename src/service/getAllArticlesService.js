import axios from "axios";
import apiPath from "./apiPath";

const getAllArticlesApi = async (user) => {
  try {
    const url = `${apiPath.arvanCloud}/articles`;
    const config = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Token ${user.token}`,
    };

    const response = await axios.get(url, { headers: config });

    return { data: response.data, status: true };
  } catch (error) {
    console.log(error.message);
    return { data: error.response.data.errors, status: false };
  }
};

export default getAllArticlesApi;
