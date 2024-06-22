import React, { useEffect, useState } from "react";
// Styles
import styles from "./SendMail.module.css";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
import ProgressBar from "@ramonak/react-progress-bar";
import CloseIcon from '@mui/icons-material/Close';
import { getUserRelatedInformations, sendMail } from "../../APIs/sendMail_APIs";

const SendMail = () => {
  
  // useStates
  const [sendingInProgress, setSendingInProgress] = useState(false);
  const [intval, setIntval] = useState(undefined);
  const [completedProgressPercentage, setCompletedProgressPercentage] = useState(0);
  const [members, setMembers] = useState([]);
  const [abortController, setAbortController] = useState(new AbortController());
  let signal = abortController.signal;


  // useEffects
  useEffect(() => {
    // console.log()
    getUserRelatedInformations()
    .then(res => {
      setMembers(res.data?.result)
    })
  }, [])

  // useNavigation
  const navigate = useNavigate();

  // handlers
  const submitHandler = (event) => {
    event.preventDefault();
    setSendingInProgress(true);
    let percentage = 0;
    setIntval(setInterval(() => {
      if(percentage < 100){
        percentage += 12.5;
        setCompletedProgressPercentage(percentage);
      }
    }, 1000));
    sendMail(signal)
    .then(res => {
      if(res.status === 200){
        Store.addNotification({
          title: "Successful",
          message: 'All Emails were sent successfully',
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
      }
      navigate('/upload');
    })
    .catch(err => {
      if(err.message === 'canceled') {
        Store.addNotification({
          title: "Failure",
          message: `You were cancelled the API call`,
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
      }
      else{
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
      }
    })
  };

  return (
    <div className={styles.container}>
      <div className={styles.progressProcess}>
        {sendingInProgress === true &&
        <>
        <h3>progress process</h3>
        <div>
          <ProgressBar bgColor="#61dafb" completed={completedProgressPercentage} width="500px" maxCompleted={100}/>
          <div className={styles.closeButton} onClick={() => {
            abortController.abort();
            setAbortController(new AbortController());
            setSendingInProgress(false);
            setCompletedProgressPercentage(0);
            clearInterval(intval)
            setIntval(undefined)
          }}><CloseIcon/></div>
        </div></>}
      </div>
      <form className={styles.sendMail} onSubmit={submitHandler} autoComplete="off">
        <h2>Entered to DB Members</h2>
        <div className={styles.members}>
          {
            members !== undefined && members !== null && members.length > 0 && members.map(member => {
              return <div className={styles.member}>
                <p>NID: {member.national_ID}</p>
                <p>Email: {member.email}</p>
              </div>
            })
          }
        </div>
        <button onClick={submitHandler}>Send Mail</button>
      </form>
    </div>
  );
};

export default SendMail;
