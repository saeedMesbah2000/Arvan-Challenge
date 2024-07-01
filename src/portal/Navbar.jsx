import React from "react";

const Navbar = ({ user, setUser }) => {
  return (
    <nav
      className="d-flex flex-row justify-content-between p-3 navbar navbar-expand-lg navbar-light text-light"
      style={{ backgroundColor: "#373A3C", height: "60px" }}
    >
      <div className="navbar-brand d-flex flex-row p-0 align-items-center justify-centent-center gap-4">
        <p className="m-0 text-light">Arvan Challenge</p>
        <p className="m-0 text-light">Welcome {user.userName}</p>
      </div>

      <button
        className="btn btn-outline-info my-2 my-sm-0"
        onClick={() => {
          setUser({ loggedIn: false });
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
