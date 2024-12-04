import { useState, useEffect } from "react";


interface UseFormProps<T> {
  initialValues: T;
  validate: (values: T) => { [key: string]: string }; 
}

interface UseFormReturn<T> {
  values: T;
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  getTextInputProps: (name: keyof T) => {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
  };
  isValid: boolean;
}

function useForm<T>({ initialValues, validate }: UseFormProps<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState(false);

  const handleChangeInput = (name: keyof T, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (name: keyof T) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name] as string || '';
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(name, event.target.value);
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [values, validate]);

  return { values, errors, touched, getTextInputProps, isValid };
}

export default useForm;
