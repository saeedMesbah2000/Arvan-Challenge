import React, { useState } from "react";

const useMessage = () => {
  const [toastMessages, setToastMessages] = useState([]);

  const showMessage = (inputMessage) => {
    setToastMessages((preState) => {
      const temp = [...preState];
      temp.push({
        message: inputMessage,
        id: temp.length + 1,
      });
      return temp;
    });
  };

  return {
    toastMessages,
    setToastMessages,
    showMessage,
  };
};

export default useMessage;
