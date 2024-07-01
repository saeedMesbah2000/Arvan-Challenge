import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = ({ user, children }) => {
  return (
    <div className="d-flex flex-row">
      <div
        className="d-flex flex-column p-3 gap-2"
        style={{
          minHeight: "100vh",
          width: "200px",
          backgroundColor: "#1c7cd5",
          fontSize: "22px",
          fontWeight: "45px",
        }}
      >
        <p className="m-0 text-light">Post</p>

        <NavLink
          to="/articles"
          state={user}
          className={({ isActive, isPending }) => {
            return `${isActive ? "" : ""} text-light px-3`;
          }}
          style={{ textDecoration: "none", fontSize: "18px" }}
        >
          All Articles
        </NavLink>

        <NavLink
          to="/articles/create"
          state={user}
          className={({ isActive, isPending }) => {
            return `${isActive ? "" : ""} text-light px-3`;
          }}
          style={{ textDecoration: "none", fontSize: "18px" }}
        >
          New Articles
        </NavLink>
      </div>
      {children}
    </div>
  );
};

export default SideBar;
