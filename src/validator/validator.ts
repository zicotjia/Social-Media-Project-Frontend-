
export function validateEmail(value: string) {
    let error;

    if (!value) {
      error = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    } 
    return error;
  }

export function validatePassword(value: string) {
    let error;
    if (!value) {
      error = 'Password is required';
    } else if (value.length < 8) {
      error = 'Invalid Password, Password must have at least 8 characters';
    }
    return error;
  }

export function validateName(value: string) {
    let error;
    if (!value) {
        error = 'Name is required';
    } else if (!value.match(/^[A-Za-z]+$/)) {
        error = 'Invalid Name, please use only alphabets'
    } else if (value.length < 2) {
        error = 'Name must be at least 2 character long'
    }
    return error
}

export function validateNameChange(value: string) {
  let error;

  if (!value) {

  } else if (!value.match(/^[A-Za-z]+$/)) {
      error = 'Invalid Name, please use only alphabets'
  } else if (value.length < 2) {
      error = 'Name must be at least 2 character long'
  }
  return error
}

export function validateUsername(value: string) {
    let error;
    if (!value) {
        error = 'Name is required';
    } else if (!value.match(/^[A-Za-z]+$/)) {
        error = 'Invalid Username, please use only alphabets'
    } else if (value.length < 5) {
        error = 'Username must be at least 5 character long'
    }
    return error
}

export function validateUsernameChange(value: string) {
  let error;

  if (!value) {
    
  } else if (!value.match(/^[A-Za-z]+$/)) {
      error = 'Invalid Username, please use only alphabets'
  } else if (value.length < 5) {
      error = 'Username must be at least 5 character long'
  }
  return error
}

export function validateImage(value: string) {
  let error = "test";

  if(!value) {
    error = "A Picture is Required"
  }

  return error;
}