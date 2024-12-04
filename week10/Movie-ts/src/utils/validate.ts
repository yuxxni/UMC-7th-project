// 사용자 정보 타입 정의
interface UserValues {
  email: string;
  password: string;
  passwordCheck?: string;  
}


interface ValidationErrors {
  [key: string]: string;  
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


function validateUser(values: UserValues): ValidationErrors {
  const errors: ValidationErrors = {};

  // 이메일 유효성 검사
  if (!values.email) {
    errors.email = "이메일은 필수 입력요소입니다.";
  } else if (typeof values.email !== 'string') {
    errors.email = "이메일은 문자열이어야 합니다.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "유효한 이메일 형식이어야 합니다.";
  }

  // 비밀번호 유효성 검사
  if (!values.password) {
    errors.password = "비밀번호는 필수 입력요소입니다.";
  } else if (typeof values.password !== 'string') {
    errors.password = "비밀번호는 문자열이어야 합니다.";
  } else if (values.password.length < 8) {
    errors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
  } else if (values.password.length > 16) {
    errors.password = "비밀번호는 최대 16자 이하여야 합니다.";
  }

  return errors;
}

// 로그인 유효성 검사
const validateLogin = (values: UserValues): ValidationErrors => {
  return validateUser(values);  // 로그인 검사는 기본적으로 사용자의 검증만 사용
};

// 회원가입 유효성 검사
const validateSignup = (values: UserValues): ValidationErrors => {
  const errors = validateUser(values);  // 기본적인 유효성 검사

  
  if (!values.passwordCheck) {
    errors.passwordCheck = '비밀번호 검증은 필수 입력요소입니다.';
  } else if (values.password !== values.passwordCheck) {
    errors.passwordCheck = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
};

export { validateLogin, validateSignup };

