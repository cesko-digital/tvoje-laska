'use client'

import { useState, useEffect, FormEvent } from "react";
import Router from "next/router";
import useUser from "./useUser";

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, loggedIn } = useUser();

  useEffect(() => {
    if (loggedIn) Router.replace("/");
  }, [loggedIn]);

  if (loggedIn) return <> Redirecting.... </>;

  const onLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email && password) {
      console.log('logging in');
      mutate();
    }
  };
  const onLogin = () => {
    setIsVisible(true);
  }

  return (
      <div>
      {<button className="" onClick={onLogin}>Přihlásit</button>}
      {isVisible ?   <div className="container">
        <h2 className="text-center"> login </h2>

        <form onSubmit={onLoginSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              value={email}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="password"
              />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div> : <></>}
    
              </div>
  );
};

export default LoginForm;