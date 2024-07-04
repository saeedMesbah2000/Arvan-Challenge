import React, { useState, useEffect, useCallback } from "react";
import styles from "./Notification.module.css";

const Notification = ({
  hasError = false,
  listOfMessages = [],
  setListOfMessages,
}) => {
  const deleteToastMessage = useCallback(
    (id) => {
      const newList = listOfMessages.filter((e) => e.id !== id);
      setListOfMessages(newList);
    },
    [listOfMessages, setListOfMessages]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (listOfMessages.length) {
        deleteToastMessage(listOfMessages[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [listOfMessages]);

  return (
    <>
      {listOfMessages.map((item) => {
        return (
          <div
            className={`${styles.toast} ${
              hasError ? styles.toastError : styles.toastSuccess
            }`}
          >
            <p className={styles.toastMessage}>
              <span
                className={
                  hasError ? styles.toastErrorBold : styles.toastSuccessBold
                }
              >
                {hasError ? "Failed " : "Well done "}
              </span>{" "}
              {item.message}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default Notification;
