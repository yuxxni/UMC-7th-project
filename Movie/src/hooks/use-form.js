import { useState, useEffect } from "react";

function useForm({ initialValues, validate }) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);  // isValid 상태 추가

  const handleChangeInput = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (name) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const getTextInputProps = (name) => {
    const value = values[name] || ''; 
    const onChange = (event) => handleChangeInput(name, event.target.value);
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
    // isValid 상태 업데이트: 오류가 없으면 유효
    setIsValid(Object.keys(newErrors).length === 0);
  }, [values, validate]);

  return { values, errors, touched, getTextInputProps, isValid };
}

export default useForm;