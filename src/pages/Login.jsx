import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import loginApi from "../service/loginService";
import styles from "./Login.module.css";
import { useInput, useMessage } from "../hooks";
import Notification from "../share-component/Notification";

const emailValidation = (value) => {
  return value.includes("@");
};

const passwordValidation = (value) => {
  return value.trim() !== "";
};

const Login = () => {
  const navigate = useNavigate();
  const { showMessage, toastMessages, setToastMessages } = useMessage();

  const {
    value: emailValue,
    inputIsValid: emailIsValid,
    hasError: emailError,
    onBlurHandler: emailOnBlurHandler,
    onChangeHandler: emailOnChangeHandler,
    onResetHandler: emailOnResetHandler,
  } = useInput(emailValidation);

  const {
    value: passwordValue,
    inputIsValid: passwordIsValid,
    hasError: passwordError,
    onBlurHandler: passwordOnBlurHandler,
    onChangeHandler: passwordOnChangeHandler,
    onResetHandler: passwordOnResetHandler,
  } = useInput(passwordValidation);

  const formIsValid = passwordIsValid && emailIsValid;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await loginApi({
      user: { email: emailValue, password: passwordValue },
    });

    if (response.status) {
      navigate("/articles", {
        state: {
          loggedIn: true,
          userName: response.data.user.username,
          token: response.data.user.token,
        },
      });
    } else {
      for (const key in response.data) {
        showMessage(key + " " + response.data[key]);
      }
    }
  };

  return (
    <div className={styles.login}>
      <Notification
        hasError={true}
        listOfMessages={toastMessages}
        setListOfMessages={setToastMessages}
      />

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
              value={emailValue}
              onChange={emailOnChangeHandler}
              onBlur={emailOnBlurHandler}
            />
            {emailError && (
              <div className={styles.login_error}>Wront Input</div>
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
              value={passwordValue}
              onChange={passwordOnChangeHandler}
              onBlur={passwordOnBlurHandler}
            />
            {passwordError && (
              <div className={styles.login_error}>Required field</div>
            )}
          </div>

          <button
            type="submit"
            disabled={!formIsValid}
            className={`btn ${styles.lgin_form_button}`}
          >
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
