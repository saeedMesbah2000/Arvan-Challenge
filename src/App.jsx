import Navbar from "./portal/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import SideBar from "./portal/SideBar";
import { Outlet, useLocation } from "react-router";
import { createContext, useState } from "react";
import { Navigate } from "react-router-dom";

export const UserContext = createContext();
export const UserSetContext = createContext();

function App() {
  const location = useLocation();
  const [user, setUser] = useState(location.state);

  return (
    <>
      {user?.loggedIn ? (
        <UserContext.Provider value={user}>
          <UserSetContext.Provider value={setUser}>
            <Navbar />
            <SideBar>
              <Outlet />
            </SideBar>
          </UserSetContext.Provider>
        </UserContext.Provider>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}

export default App;
