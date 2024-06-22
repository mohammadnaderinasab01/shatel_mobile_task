import React, { useEffect, useState } from "react";
// Validate
import { validateUpload } from "../../components/validate";
// Styles
import styles from "./Upload.module.css";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../../APIs/upload_APIs";
import { Store } from "react-notifications-component";

const Upload = () => {
  
  // useStates
  const [data, setData] = useState({
    uploadFile: undefined
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // useNavigation
  const navigate = useNavigate();

  // useEffects
  useEffect(() => {
    setErrors(validateUpload(data));
  }, [data, touched]);

  // handlers
  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      console.log('data from submit handler: ', data.uploadFile);
      var reader = new FileReader();
      reader.onload = function () {
        uploadFile({
          // upload_file: reader.result
          upload_file: data.uploadFile
        })
        .then(res => {
          if(res.status === 201){
            Store.addNotification({
              title: "Successful",
              message: 'The Excel File was successfully uploaded',
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
            navigate('/send-mail');
            setData({
              uploadFile: undefined
            });
            setErrors({});
            setTouched({});
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
      };
      reader.readAsBinaryString(data.uploadFile);
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
        uploadFile: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formUpload} onSubmit={submitHandler} autoComplete="off">
        <h2>Upload</h2>
        <div>
          <div className={errors.uploadFile && touched.uploadFile ? styles.unCompleted : !errors.uploadFile && touched.uploadFile ? styles.completed : undefined}>
            <input type="file" name="uploadFile" placeholder="Upload File" onChange={(e) => {
              console.log(e.target.files[0])
              setData({uploadFile: e.target.files[0]})
              }} onFocus={focusHandler} autoComplete="off" />
          </div>
          {errors.uploadFile && touched.uploadFile && <span className={styles.error}>{errors.uploadFile}</span>}
        </div>
        <div>
          <button type="submit">Upload File</button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
