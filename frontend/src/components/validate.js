export const validateAuth = (data, type) => {
  const errors = {};

  if (!data.email) {
    errors.email = "Email is Required!";
  } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(data.email).toLowerCase())) {
    errors.email = "Email address is invalid!";
  } else {
    delete errors.email;
  }

  if (!data.password) {
    errors.password = "Password is Required";
  } else if (!(data.password.length >= 6)) {
    errors.password = "Password needs to be 6 character or more";
  } else {
    delete errors.password;
  }

  if (type === "signUp") {
    if (!data.firstName.trim()) {
      errors.firstName = "First Name is Required!";
    } else {
      delete errors.firstName;
    }
    if (!data.lastName.trim()) {
      errors.lastName = "Last Name is Required!";
    } else {
      delete errors.lastName;
    }
    if (!data.national_ID.trim()) {
      errors.national_ID = "National ID is Required!";
    }
    else if (data.national_ID.trim() && data.national_ID.length != 10) {
      errors.national_ID = "National ID must have exactly 10 digits!";
    }
    else if (data.national_ID.trim() && data.national_ID.length == 10 && !/^[0-9]+$/.test(data.national_ID)) {
      errors.national_ID = "Only numbers are valid!";
    }else if(!data.national_ID.trim() || data.national_ID.length != 10 || !/^[0-9]+$/.test(data.national_ID)){
      delete errors.national_ID;
    }
    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm the Password";
    } else if (!(data.confirmPassword === data.password)) {
      errors.confirmPassword = "Password is not match!";
    } else {
      delete errors.confirmPassword;
    }
  }

  return errors;
};

export const validateUpload = (data) => {
  const errors = {};
  if (!data.uploadFile) {
    errors.uploadFile = "Upload File is Required!";
  } else if (data.uploadFile.size > 1000000000) {
    errors.uploadFile = "Upload File size must be less than 20kb!";
  } else {
    delete errors.uploadFile;
  }
  return errors;
};
