import axios from "axios";
import apiPath from "./apiPath";

let config = {
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Accept: "*/*",
  },
};

const loginApi = async (userObject) => {
  try {
    // debugger;
    // const response = await axios.post(
    //   apiPath.arvanCloud + "/users/login",
    //   userObject,
    //   { headers: config }
    // );
    // debugger;
    // return response;

    return {
      user: {
        email: "saeedTest@gmail.com",
        username: "testUser1",
        bio: null,
        image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNzg1Mn0sImlhdCI6MTcxOTc3MTQwOCwiZXhwIjoxNzI0OTU1NDA4fQ.6CcgIkjsHgvQk7SKL7JCtx6BjGzbzupeEWzNLw70PVE",
      },
    };
  } catch (error) {
    alert(JSON.stringify(error.message));
    return false;
  }
};

export default loginApi;
