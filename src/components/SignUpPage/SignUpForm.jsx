import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { register, login } from "../../redux/auth/operations";
import { setEmail } from "../../redux/auth/slice";
import Logo from "../HomePage/WelcomeSection/Logo/Logo";
import GoogleAuth from "../GoogleAuth/GoogleAuth.jsx";
// import GoogleAuth2 from "../GoogleAuth/GoogleAuth2.jsx";
import s from "./SignUpForm.module.css";

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must not exceed 32 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Repeat Password is required"),
});

const SignUpForm = () => {
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);

  const {
    register: hookFormRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await dispatch(register({ email, password })).unwrap();
      await dispatch(login({ email, password })).unwrap();
      dispatch(setEmail(email));
      navigate("/tracker");
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 400) {
          setNotification("Bad Request. Please check your input.");
        } else if (statusCode === 401) {
          setNotification("Unauthorized. Please login first.");
        } else if (statusCode === 409) {
          setNotification("Conflict. This email is already registered.");
          errors.email = { message: "This email is already registered." };
        } else if (statusCode === 500) {
          setNotification("Server Error. Please try again later.");
        } else {
          setNotification("An unexpected error occurred. Please try again.");
        }
      } else {
        setNotification("An unknown error occurred. Please try again.");
      }
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.logo}>
        <Logo />
      </div>
      <div className={s.form}>
        <h2 className={s.titleSingUp}>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={s.formBody}>
          <div className={s.wrapForm}>
            <div className={s.formEl}>
              <label className={s.label}>
                <span className={s.span}>Email</span>
              </label>
              <div className={s.inputWrap}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`${s.input} ${errors.email ? s.error : ""}`}
                  {...hookFormRegister("email")}
                />
              </div>

              {errors.email && (
                <div className={s.textError}>{errors.email.message}</div>
              )}
            </div>

            <div className={s.formEl}>
              <label className={s.label}>
                <span className={s.span}>Password</span>
              </label>
              <div className={s.inputWrap}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`${s.input} ${errors.password ? s.error : ""}`}
                  {...hookFormRegister("password")}
                />
                <label className={s.labelIcons}>
                  <span
                    className={s.spanIcons}
                    onClick={() => setPasswordVisible((prev) => !prev)}
                  >
                    <svg
                      className={s.svgSingUp}
                      width="20"
                      height="20"
                      viewBox="0 0 32 32"
                    >
                      <use
                        href={`/sprite.svg#${
                          passwordVisible ? "icon-eye" : "icon-eye-off"
                        }`}
                      ></use>
                    </svg>
                  </span>
                </label>
              </div>

              {errors.password && (
                <div className={s.textError}>{errors.password.message}</div>
              )}
            </div>

            <div className={s.formEl}>
              <label className={s.label}>
                <span className={s.span}>Repeat password</span>
              </label>
              <div className={s.inputWrap}>
                <input
                  type={repeatPasswordVisible ? "text" : "password"}
                  placeholder="Repeat password"
                  className={`${s.input} ${
                    errors.repeatPassword ? s.error : ""
                  }`}
                  {...hookFormRegister("repeatPassword")}
                />
                <label className={s.labelIcons}>
                  <span
                    className={s.spanIcons}
                    onClick={() => setRepeatPasswordVisible((prev) => !prev)}
                  >
                    <svg
                      className={s.svgSingUp}
                      width="20"
                      height="20"
                      viewBox="0 0 32 32"
                    >
                      <use
                        href={`/sprite.svg#${
                          repeatPasswordVisible ? "icon-eye" : "icon-eye-off"
                        }`}
                      ></use>
                    </svg>
                  </span>
                </label>
              </div>

              {errors.repeatPassword && (
                <div className={s.textError}>
                  {errors.repeatPassword.message}
                </div>
              )}
            </div>
          </div>

          <div className={s.divBtn}>
            <button type="submit" className={s.singUpBtn}>
              Sign Up
            </button>
            <GoogleAuth />
            {/* <GoogleAuth2 /> */}
            <p className={s.text}>
              Already have an account?
              <Link to="/signin" className={s.link}>
                <span className={s.spanLink}>Sign In</span>
              </Link>
            </p>
          </div>
        </form>
        {notification && <div className={s.notification}>{notification}</div>}
      </div>
    </div>
  );
};

export default SignUpForm;
