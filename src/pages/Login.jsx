import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import loginApi from "../service/loginService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.includes("@")) {
      setErrors({ ...errors, email: "Email is not correct" });
      return;
    }

    if (email.length === 0) {
      setErrors({ ...errors, email: "Enter Email" });
      return;
    }

    setErrors({ ...errors, email: "" });

    if (password.length < 2) {
      setErrors({
        ...errors,
        password: "Password must be atleast 2 characters",
      });

      return;
    }
    setErrors({
      ...errors,
      password: "",
    });

    const response = await loginApi({
      user: { email: email, password: password },
    });

    if (response) {
      navigate("/articles", {
        state: {
          loggedIn: true,
          userName: response.user.username,
          token: response.user.token,
        },
      });
    }
  };

  return (
    <div
      className="d-flex flex-row justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        style={{
          width: "450px",
          height: "423px",
          backgroundColor: "#DDDDDD",
          borderRadius: "4px",
          padding: "0px 27px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <p
            className="m-0 text-center"
            style={{ fontSize: "47px", color: "#777777", paddingTop: "37px" }}
          >
            LOGIN
          </p>

          <div
            className="form-group"
            style={{ marginBottom: "25px", position: "relative" }}
          >
            <label for="exampleInputEmail1" style={{ marginBottom: "9px" }}>
              Email
            </label>

            <input
              type="email"
              className="form-control rounded-lg"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ borderRadius: "4px" }}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            {errors.email && (
              <div
                style={{
                  position: "absolute",
                  bottom: "-22px",
                  left: "5px",
                  backgroundColor: "#cb2e25",
                }}
              >
                {errors.email}
              </div>
            )}
          </div>

          <div
            className="form-group"
            style={{ marginBottom: "56px", position: "relative" }}
          >
            <label for="exampleInputPassword1" style={{ marginBottom: "9px" }}>
              Password
            </label>

            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              style={{ borderRadius: "4px" }}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {errors.password && (
              <div
                style={{
                  position: "absolute",
                  bottom: "-22px",
                  left: "5px",
                  backgroundColor: "#cb2e25",
                }}
              >
                {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ borderRadius: "4px" }}
          >
            Login
          </button>
        </form>

        <div
          className="d-flex flex-row"
          style={{ marginTop: "15px", gap: "11px" }}
        >
          <p>Don't have account ?</p>
          <NavLink
            to="/Register"
            style={{ textDecoration: "none", fontSize: "18px" }}
          >
            Register Now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
