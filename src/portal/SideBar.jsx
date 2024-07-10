/*
  this component is for side bar and it wraps the other components like AllArticles and ect.

  argumetns : 

  1- children : this components take other components and wraps its self around it and adding side bar to all other compoents

*/

import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";

const SideBar = ({ children }) => {
  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBar_container}>
        <p className={styles.sideBar_title}>Post</p>

        <NavLink
          to="/articles"
          className={({ isActive, isPending }) => {
            return `${
              isActive
              // ? `${styles.sideBar_menu_item_active}`
              // : `${styles.sideBar_menu_item_not_active}`
            } text-light px-3 ${styles.sideBar_menu_item}`;
          }}
          // style={{ textDecoration: "none", fontSize: "18px" }}
        >
          All Articles
        </NavLink>

        <NavLink
          to="/articles/create"
          className={({ isActive, isPending }) => {
            return `${
              isActive
              // ? `${styles.sideBar_menu_item_active}`
              // : `${styles.sideBar_menu_item_not_active}`
            } text-light px-3 ${styles.sideBar_menu_item}`;
          }}
        >
          New Articles
        </NavLink>
      </div>
      {children}
    </div>
  );
};

export default SideBar;
