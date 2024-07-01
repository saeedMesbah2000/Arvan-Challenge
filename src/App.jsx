import Navbar from "./portal/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import SideBar from "./portal/SideBar";
import { Outlet, useLocation } from "react-router";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function App() {
  const location = useLocation();
  const [user, setUser] = useState(location.state);

  return (
    <>
      {user?.loggedIn ? (
        <div>
          <Navbar user={user} setUser={setUser} />
          <SideBar user={user}>
            <Outlet />
          </SideBar>
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}

export default App;
