import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <div
      className="d-flex flex-row justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        style={{
          width: "450px",
          height: "528px",
          backgroundColor: "#DDDDDD",
          borderRadius: "4px",
          padding: "0px 20px",
        }}
      >
        <form>
          <p
            className="m-0 text-center"
            style={{
              fontSize: "47px",
              color: "#777777",
              paddingTop: "35px",
              paddingBottom: "35px",
            }}
          >
            Register
          </p>

          <div class="form-group" style={{ marginBottom: "25px" }}>
            <label for="exampleInputEmail1" style={{ marginBottom: "8px" }}>
              User
            </label>

            <input
              type="text"
              className="form-control rounded-lg"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ borderRadius: "4px" }}
            />
          </div>

          <div class="form-group" style={{ marginBottom: "25px" }}>
            <label for="exampleInputEmail1" style={{ marginBottom: "8px" }}>
              Email
            </label>

            <input
              type="email"
              className="form-control rounded-lg"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ borderRadius: "4px" }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "45px" }}>
            <label for="exampleInputPassword1" style={{ marginBottom: "8px" }}>
              Password
            </label>

            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              style={{ borderRadius: "4px" }}
            />
          </div>

          <button
            // type="submit"
            className="btn btn-primary w-100"
            style={{ borderRadius: "4px" }}
          >
            Register
          </button>
        </form>

        <div
          className="d-flex flex-row"
          style={{ marginTop: "15px", gap: "11px" }}
        >
          <p>Already registerd ?</p>
          <NavLink
            to="/login"
            style={{ textDecoration: "none", fontSize: "18px" }}
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
