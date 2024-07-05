import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import loginApi from "../service/loginService";
import styles from "./Login.module.css";

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
    <div className={styles.login}>
      <div className={styles.login_container}>
        <form onSubmit={handleSubmit}>
          <p className={styles.login_header}>LOGIN</p>

          <div className={styles.login_form_container}>
            <label for="exampleInputEmail1" className={styles.login_form_label}>
              Email
            </label>

            <input
              type="email"
              className={`form-control ${styles.login_form_input}`}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            {errors.email && (
              <div className={styles.login_error}>{errors.email}</div>
            )}
          </div>

          <div className={`form-group ${styles.login_form_container}`}>
            <label
              for="exampleInputPassword1"
              className={styles.login_form_label}
            >
              Password
            </label>

            <input
              type="password"
              className={`form-control ${styles.login_form_input}`}
              id="exampleInputPassword1"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {errors.password && (
              <div className={styles.login_error}>{errors.password}</div>
            )}
          </div>

          <button type="submit" className={`btn ${styles.lgin_form_button}`}>
            Login
          </button>
        </form>

        <div className={styles.login_account_container}>
          <p>Don't have account ?</p>
          <NavLink to="/Register" className={styles.login_account_link}>
            Register Now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
