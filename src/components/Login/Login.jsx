import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import "./Login.css";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
          />
          {!showPassword ? (
            <FontAwesomeIcon
              onClick={() => setShowPassword(true)}
              style={{
                position: "absolute",
                top: "53px",
                right: "80px",
                height: "18px",
              }}
              icon={faEyeSlash}
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => setShowPassword(false)}
              style={{
                position: "absolute",
                top: "53px",
                right: "80px",
                height: "18px",
              }}
              icon={faEye}
            />
          )}
        </div>
        <input className="btn-submit" type="submit" value="Login" />
      </form>
      <p>
        <small>
          New to Ema-john? <Link to="/signup">Create New Account</Link>
        </small>
      </p>
    </div>
  );
};

export default Login;
