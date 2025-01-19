import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/auth/operations";
import {
  // selectError,
  selectLoading,
  selectIsLoggedIn,
} from "../../../redux/auth/selectors";
import s from "./SignInForm.module.css";
import { setEmail } from "../../../redux/auth/slice";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must not exceed 32 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const isAuthenticated = useSelector(selectIsLoggedIn);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notification, setNotification] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const showMessage = (msg, type = "error") => {
    setNotification({ text: msg, type });
    setTimeout(() => setNotification(""), 5000);
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await dispatch(login({ email, password }));
      dispatch(setEmail(email));
      if (!response.userExists) {
        showMessage("User not found. Please register first.");
        return;
      }
      showMessage("Login successful!", "success");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          showMessage("Bad request. Please check your inputs.", "error");
        } else if (err.response.status === 404) {
          showMessage(
            "User not found. Please check your credentials.",
            "error"
          );
        } else {
          showMessage("An error occurred. Please try again later.", "error");
        }
      } else {
        showMessage("Network error. Please check your connection.", "error");
      }
    }
  };

  if (isAuthenticated) {
    navigate("/tracker");
  }

  return (
    <div className={s.section}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <h2 className={s.title}>Sign In</h2>
        <div className={s.formElement}>
          <label className={s.label} htmlFor="email">
            Email
          </label>
          <div className={s.inputWrap}>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`${s.input} ${errors.email ? s.inputError : ""}`}
              {...register("email", {
                required: true,
                onBlur: () => trigger("email"),
              })}
            />
          </div>
          {errors.email && (
            <div className={s.error}>{errors.email.message}</div>
          )}
        </div>

        <div className={s.formElement}>
          <label className={s.label} htmlFor="password">
            Password
          </label>
          <div className={s.passwordWrapper}>
            <div className={s.inputWrap}>
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className={`${s.input} ${errors.password ? s.inputError : ""}`}
                {...register("password", {
                  required: true,
                  onBlur: () => trigger("password"),
                })}
              />
            </div>
            <span
              className={s.togglePassword}
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              <svg className={s.eyeIcon}>
                <use
                  href={`/src/assets/sprite.svg#${
                    passwordVisible ? "icon-eye" : "icon-eye-off"
                  }`}
                ></use>
              </svg>
            </span>
          </div>
          {errors.password && (
            <div className={s.error}>{errors.password.message}</div>
          )}
        </div>

        <div className={s.box}>
          <button type="submit" className={s.button} disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
          <p className={s.text}>
            Don’t have an account?{" "}
            <Link to="/signup" className={s.link}>
              Sign Up
            </Link>
          </p>
        </div>
      </form>
      {notification && (
        <div
          className={`${s.notification} ${
            notification.type === "error"
              ? s.notificationError
              : s.notificationSuccess
          }`}
        >
          {notification.text || notification}
        </div>
      )}
    </div>
  );
};

export default SignInForm;
