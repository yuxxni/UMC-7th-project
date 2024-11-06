const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


function validateUser(values) {
    const errors = {};

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

function validateLogin(values) {
    return validateUser(values);
}


const validateSignup = (values) => {
    const errors = validateUser(values);

    // 비밀번호 확인 검사
    if (!values.passwordCheck) {
        errors.passwordCheck = '비밀번호 검증은 필수 입력요소입니다.';
    } else if (values.password !== values.passwordCheck) {
        errors.passwordCheck = '비밀번호가 일치하지 않습니다.';
    }

    return errors;
};

export { validateLogin, validateSignup };
