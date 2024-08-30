import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(
      Object.keys(errors).length === 0 &&
      isChecked &&
      email !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      firstName !== '' &&
      lastName !== '' &&
      secondName !== '' &&
      birthday !== '' &&
      phoneNumber !== ''
    );
  }, [errors, isChecked, email, password, confirmPassword, firstName, lastName, secondName, birthday, phoneNumber]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Email validation
    const emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (!emailPattern.test(email)) {
      newErrors.email = "Введите правильный E-mail!";
    }

    // Password validation
    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!passwordPattern.test(password)) {
      newErrors.password = "Пароль должен содержать минимум 8 символов, включая цифру, заглавную и строчную буквы!";
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают!";
    }

    // Name validation
    const namePattern = /^[a-zA-Zа-яА-ЯёЁ]+$/;
    if (!namePattern.test(firstName)) {
      newErrors.firstName = "Имя должно содержать только буквы!";
    }
    if (!namePattern.test(lastName)) {
      newErrors.lastName = "Фамилия должна содержать только буквы!";
    }
    if (!namePattern.test(secondName)) {
      newErrors.secondName = "Отчество должно содержать только буквы!";
    }

    // Phone number validation
    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!phonePattern.test(phoneNumber)) {
      newErrors.phoneNumber = "Введите правильный номер телефона!";
    }

    // Birthday validation
    const birthdayPattern = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!birthdayPattern.test(birthday)) {
      newErrors.birthday = "Введите дату в формате ДД.ММ.ГГГГ!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && isChecked) {
      try {
        await register(
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          secondName,
          birthday,
          phoneNumber
        );
        console.log('Registration successful');
        navigate('/login');
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    fieldName: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    
    const match = digits.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `+7 (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }
    return value;
  };

  const formatBirthday = (value: string) => {
    const digits = value.replace(/\D/g, '');
    
    const match = digits.match(/^(\d{2})(\d{2})(\d{4})$/);
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
            value={email}
            onChange={handleInputChange(setEmail, "email")}
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
            value={password}
            onChange={handleInputChange(setPassword, "password")}
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
            value={confirmPassword}
            onChange={handleInputChange(setConfirmPassword, "confirmPassword")}
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
            value={lastName}
            onChange={handleInputChange(setLastName, "lastName")}
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
            value={firstName}
            onChange={handleInputChange(setFirstName, "firstName")}
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
            value={secondName}
            onChange={handleInputChange(setSecondName, "secondName")}
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
            value={birthday}
            onChange={(e) => {
              const formattedValue = formatBirthday(e.target.value);
              setBirthday(formattedValue);
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
            value={phoneNumber}
            onChange={(e) => {
              const formattedValue = formatPhoneNumber(e.target.value);
              setPhoneNumber(formattedValue);
            }}
            className={errors.phoneNumber ? "error" : ""}
            maxLength={18} // +7 (xxx) xxx-xx-xx -> 18 characters
          />
          {errors.phoneNumber && (
            <small className="error-message">{errors.phoneNumber}</small>
          )}
        </div>

        <div className="consent-checkbox">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <span className='checkbox-text'>
            Нажимая кнопку «Зарегистрироваться», Вы даёте согласие на 
            <a href="https://t1.ru/documents/personal_data_politics/" role="switch" target='_blanc' className='checkbox-link'>обработку персональных данных</a>
          </span>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || !isChecked}
          className={!isFormValid || !isChecked ? "disabled" : ""}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Register;
