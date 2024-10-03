import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  secondName: string;
  birthday: string;
  phoneNumber: string;
  isChecked: boolean;
}

const initialFormState: FormState = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  secondName: '',
  birthday: '',
  phoneNumber: '',
  isChecked: false,
};

const Register: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(
      formState.isChecked &&
      formState.email !== '' &&
      formState.password !== '' &&
      formState.confirmPassword !== '' &&
      formState.firstName !== '' &&
      formState.lastName !== '' &&
      formState.secondName !== '' &&
      formState.birthday !== '' &&
      formState.phoneNumber !== ''
    );
  }, [errors, formState]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    const emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (!emailPattern.test(formState.email)) {
      newErrors.email = "Введите правильный E-mail!";
    }

    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!passwordPattern.test(formState.password)) {
      newErrors.password = "Пароль должен содержать минимум 8 символов, включая цифру, заглавную и строчную буквы!";
    }

    if (formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают!";
    }

    const namePattern = /^[a-zA-Zа-яА-ЯёЁ]+$/;
    if (!namePattern.test(formState.firstName)) {
      newErrors.firstName = "Имя должно содержать только буквы!";
    }
    if (!namePattern.test(formState.lastName)) {
      newErrors.lastName = "Фамилия должна содержать только буквы!";
    }
    if (!namePattern.test(formState.secondName)) {
      newErrors.secondName = "Отчество должно содержать только буквы!";
    }

    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\д{2}$/;
    if (!phonePattern.test(formState.phoneNumber)) {
      newErrors.phoneNumber = "Введите правильный номер телефона!";
    }

    const birthdayPattern = /^\d{2}\.\d{2}\.\д{4}$/;
    if (!birthdayPattern.test(formState.birthday)) {
      newErrors.birthday = "Введите дату в формате ДД.ММ.ГГГГ!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && formState.isChecked) {
      try {
        await register(
          formState.email,
          formState.password,
          formState.confirmPassword,
          formState.firstName,
          formState.lastName,
          formState.secondName,
          formState.birthday,
          formState.phoneNumber
        );
        console.log('Registration successful');
        navigate('/login');
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  const handleInputChange = (fieldName: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: fieldName === 'isChecked' ? e.target.checked : e.target.value,
    }));

    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const match = digits.match(/^(\d{1})(\д{3})(\д{3})(\д{2})(\д{2})$/);
    if (match) {
      return `+7 (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }
    return value;
  };

  const formatBirthday = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const match = digits.match(/^(\д{2})(\д{2})(\д{4})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}`;
    }
    return value;
  };

  return (
    <div className="register-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Электронная почта"
            value={formState.email}
            onChange={handleInputChange("email")}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <small className="error-message">{errors.email}</small>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Пароль"
            value={formState.password}
            onChange={handleInputChange("password")}
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <small className="error-message">{errors.password}</small>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Повторите пароль"
            value={formState.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            className={errors.confirmPassword ? "error" : ""}
          />
          {errors.confirmPassword && (
            <small className="error-message">{errors.confirmPassword}</small>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Фамилия"
            value={formState.lastName}
            onChange={handleInputChange("lastName")}
            className={errors.lastName ? "error" : ""}
          />
          {errors.lastName && (
            <small className="error-message">{errors.lastName}</small>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Имя"
            value={formState.firstName}
            onChange={handleInputChange("firstName")}
            className={errors.firstName ? "error" : ""}
          />
          {errors.firstName && (
            <small className="error-message">{errors.firstName}</small>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Отчество"
            value={formState.secondName}
            onChange={handleInputChange("secondName")}
            className={errors.secondName ? "error" : ""}
          />
          {errors.secondName && (
            <small className="error-message">{errors.secondName}</small>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="День рождения (ДД.ММ.ГГГГ)"
            value={formState.birthday}
            onChange={(e) => {
              const formattedValue = formatBirthday(e.target.value);
              setFormState((prev) => ({ ...prev, birthday: formattedValue }));
            }}
            className={errors.birthday ? "error" : ""}
            maxLength={10}
          />
          {errors.birthday && (
            <small className="error-message">{errors.birthday}</small>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Номер телефона"
            value={formState.phoneNumber}
            onChange={(e) => {
              const formattedValue = formatPhoneNumber(e.target.value);
              setFormState((prev) => ({ ...prev, phoneNumber: formattedValue }));
            }}
            className={errors.phoneNumber ? "error" : ""}
            maxLength={18} // +7 (xxx) xxx-xx-xx
          />
          {errors.phoneNumber && (
            <small className="error-message">{errors.phoneNumber}</small>
          )}
        </div>

        <div className="consent-checkbox">
          <input
            type="checkbox"
            checked={formState.isChecked}
            onChange={handleInputChange("isChecked")}
          />
          <span>Согласен с правилами</span>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || !formState.isChecked}
          className={!isFormValid || !formState.isChecked ? "disabled" : ""}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Register;