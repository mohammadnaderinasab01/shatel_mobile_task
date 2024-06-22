import React, { useEffect, useState } from "react";
//Icon
import userIcon from "../../img/user.svg";
import emailIcon from "../../img/email.svg";
import passwordIcon from "../../img/password.svg";
// Validate
import { validateAuth } from "../../components/validate";
// Styles
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../APIs/auth_APIs";
import { Store } from "react-notifications-component";

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    national_ID: "",
    password: "",
    confirmPassword: ""
  });

  // useStates
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // useNavigation
  const navigate = useNavigate();

  // useEffects
  useEffect(() => {
    setErrors(validateAuth(data, "signUp"));
  }, [data, touched]);

  // handlers
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
    if (!Object.keys(errors).length) {
      signup({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        national_ID: data.national_ID,
        password: data.password,
      })
      .then(res => {
        console.log("result", res);
        if(res.status === 201){
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
          navigate('/login');
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
      });
    } else {
      Store.addNotification({
        title: "Failure",
        message: `Please Check fileds again`,
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
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        national_ID: true,
        password: true,
        confirmPassword: true
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        <h2>Sign Up</h2>
        <div>
          <div className={errors.firstName && touched.firstName ? styles.unCompleted : !errors.firstName && touched.firstName ? styles.completed : undefined}>
            <input type="text" name="firstName" value={data.firstName} placeholder="First Name" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={userIcon} alt="" />
          </div>
          {errors.firstName && touched.firstName && <span className={styles.error}>{errors.firstName}</span>}
        </div>
        <div>
          <div className={errors.lastName && touched.lastName ? styles.unCompleted : !errors.lastName && touched.lastName ? styles.completed : undefined}>
            <input type="text" name="lastName" value={data.lastName} placeholder="Last Name" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={userIcon} alt="" />
          </div>
          {errors.lastName && touched.lastName && <span className={styles.error}>{errors.lastName}</span>}
        </div>
        <div>
          <div className={errors.email && touched.email ? styles.unCompleted : !errors.email && touched.email ? styles.completed : undefined}>
            <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={emailIcon} alt="" />
          </div>
          {errors.email && touched.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div>
          <div className={errors.national_ID && touched.national_ID ? styles.unCompleted : !errors.national_ID && touched.national_ID ? styles.completed : undefined}>
            <input type="text" name="national_ID" value={data.national_ID} placeholder="National Identification Number" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={userIcon} alt="" />
          </div>
          {errors.national_ID && touched.national_ID && <span className={styles.error}>{errors.national_ID}</span>}
        </div>
        <div>
          <div className={errors.password && touched.password ? styles.unCompleted : !errors.password && touched.password ? styles.completed : undefined}>
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={passwordIcon} alt="" />
          </div>
          {errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
        </div>
        <div>
          <div className={errors.confirmPassword && touched.confirmPassword ? styles.unCompleted : !errors.confirmPassword && touched.confirmPassword ? styles.completed : !errors.confirmPassword && touched.confirmPassword ? styles.completed : undefined}>
            <input type="password" name="confirmPassword" value={data.confirmPassword} placeholder="Confirm Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={passwordIcon} alt="" />
          </div>
          {errors.confirmPassword && touched.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
        </div>
        <div>
          <button type="submit">Create Account</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Already have a account? <Link to="/login">Sign In</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
