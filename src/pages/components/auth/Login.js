import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import jwt from "jsonwebtoken";

import useAuth from "../../../hooks/useAuth";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  let from = "/";

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("merde");
  const [userFocus, setUserFocus] = useState(false);
  const [pwd, setPwd] = useState("R@ymond100");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const storedUsers =
      (await JSON.parse(localStorage.getItem("user_data"))) || [];

    const authenticatedUser = await storedUsers.find(
      (user) => user.user === username && user.pwd === pwd
    );

    if (authenticatedUser) {
      const secretKey = "merde";
      const roles = authenticatedUser.roles;
      const payload = {
        user: authenticatedUser.user,
        roles,
      };

      jwt.sign(payload, secretKey, function(err, token) {
        // Store the token in localStorage
        if (err) throw err;

        localStorage.setItem("token", token);
        setAuth({ username, pwd, roles, token });
        setUsername("");
        setPwd("");
        if (location.state != null) {
          from = location.state.from.pathname;
        }

        navigate(from, { replace: true });
      });
    } else {
      setErrMsg("Login Failed");
      errRef.current.focus();
    }
  };

  const LoginForm = (
    <form onSubmit={handleLogin}>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          ref={userRef}
          value={username}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          required
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-describedby="pwdnote"
        />
      </div>
      <button>Sign In</button>
    </form>
  );

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h4>Login </h4>
      {LoginForm}
      <p>
        Need an Account?
        <br />
        <span className="line">
          {/*put router link here*/}
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
}
export default Login;
