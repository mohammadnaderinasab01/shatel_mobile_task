import React, { useState } from "react";
import emailIcon from "../../img/email.svg";
import passwordIcon from "../../img/password.svg";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../APIs/auth_APIs";
import { Store } from "react-notifications-component";

const Login = () => {

  // useStates
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({});

  // useNavigate
  const navigate = useNavigate();

  // handlers
  const chaeckData = (obj) => {
    const { email, password } = obj;
    login({email: email, password: password})
    .then(res => {
      if(res.status === 200){
        Store.addNotification({
          title: "Successful",
          message: 'You signed Up successfully',
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        localStorage.setItem('token', res.data.token)
        navigate('/upload')
      }
    })
    .catch(err => {
      Store.addNotification({
        title: "Failure",
        message: `Something went wrong: ${err}`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    })
  };

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    chaeckData(data);
  };

  return (
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        <h2>Sign In</h2>
        <div>
          <div>
            <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={emailIcon} alt="" />
          </div>
        </div>
        <div>
          <div>
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={passwordIcon} alt="" />
          </div>
        </div>

        <div>
          <button type="submit">Login</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Don't have a account? <Link to="/signup">Create account</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
