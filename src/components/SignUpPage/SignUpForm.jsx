import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../redux/auth/operations";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Logo from "../HomePage/WelcomeSection/Logo/Logo";
import s from "./SingUpForm.module.css";
import { setEmail } from "../../redux/auth/slice.js";

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
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
    // if (data.password !== data.repeatPassword) {
    //   setNotification("Passwords do not match!");
    //   return;
    // }

    const { email, password } = data;

    try {
      await dispatch(register({ email, password })).unwrap();
      dispatch(setEmail(email)); // зберегти email
      navigate("/tracker");
    } catch (error) {
      setNotification(error.message);
    }
  };

  return (
    <div className={s.section}>
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
                          href={`/src/assets/sprite.svg#${
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
                          href={`/src/assets/sprite.svg#${
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
    </div>
  );
};

export default SignUpForm;
