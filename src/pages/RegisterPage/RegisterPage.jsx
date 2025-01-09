const RegisterPage = () => {
  return <h1>RegisterPage</h1>;
  // <SignUpPage />
  // <AdvantagesSection />
};

export default RegisterPage;

// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { register } from "../../redux/auth/operations";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import s from "./RegistrPage.module.css";

// const schema = yup.object({
//   email: yup
//     .string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
//   repeatPassword: yup
//     .string()
//     .oneOf([yup.ref("password")], "Passwords must match")
//     .required("Repeat Password is required"),
// });

// const RegistrPage = () => {
//   const dispatch = useDispatch();

//   const {
//     register: hookFormRegister,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = (data) => {
//     dispatch(register(data));
//     reset();
//   };

//   return (
//     <div className={s.containerSingUp}>
//       <h1 className={s.titleSingUp}>AquaTrack</h1>
//       <div className={s.formSingUp}>
//         <form onSubmit={handleSubmit(onSubmit)} className={s.formBody}>
//           <div className={s.textSingUp}>Sign Up</div>

//           <div className={s.formSingUpEl}>
//             <label className={s.labelSingUp}>
//               <span className={s.spanSingUp}>Email</span>
//             </label>
//             <div className={s.inputWrap}>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className={s.inputSingUp}
//                 {...hookFormRegister("email")}
//               />
//               <label className={s.labelSingUpIcons}>
//                 <span className={s.spanSingUpIcons}>
//                   <svg
//                     className={s.spanSingUp}
//                     width="20"
//                     height="20"
//                     viewBox="0 0 32 32"
//                   >
//                     <use href="/src/icons/symbol-defs.svg#icon-eye"></use>
//                   </svg>
//                 </span>
//               </label>
//             </div>

//             {errors.email && (
//               <div className={s.textErrorSingUp}>{errors.email.message}</div>
//             )}
//           </div>

//           <div className={s.formSingUpEl}>
//             <label className={s.labelSingUp}>
//               <span className={s.spanSingUp}>Password</span>
//             </label>
//             <div className={s.inputWrap}>
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 className={s.inputSingUp}
//                 {...hookFormRegister("password")}
//               />
//               <label className={s.labelSingUpIcons}>
//                 <span className={s.spanSingUpIcons}>
//                   <svg
//                     className={s.spanSingUp}
//                     width="20"
//                     height="20"
//                     viewBox="0 0 32 32"
//                   >
//                     <use href="/src/icons/symbol-defs.svg#icon-eye"></use>
//                   </svg>
//                 </span>
//               </label>
//             </div>

//             {errors.password && (
//               <div className={s.textErrorSingUp}>{errors.password.message}</div>
//             )}
//           </div>

//           <div className={s.formSingUpEl}>
//             <label className={s.labelSingUp}>
//               <span className={s.spanSingUp}>Repeat password</span>
//             </label>
//             <div className={s.inputWrap}>
//               <input
//                 type="password"
//                 placeholder="Repeat password"
//                 className={s.inputSingUp}
//                 {...hookFormRegister("repeatPassword")}
//               />
//               <label className={s.labelSingUpIcons}>
//                 <span className={s.spanSingUpIcons}>
//                   <svg
//                     className={s.spanSingUp}
//                     width="20"
//                     height="20"
//                     viewBox="0 0 32 32"
//                   >
//                     <use href="/src/icons/symbol-defs.svg#icon-eye"></use>
//                   </svg>
//                 </span>
//               </label>
//             </div>

//             {errors.repeatPassword && (
//               <div className={s.textErrorSingUp}>
//                 {errors.repeatPassword.message}
//               </div>
//             )}
//           </div>

//           <div className={s.divSingUpButton}>
//             <button type="submit" className={s.singUpBtn}>
//               Sign Up
//             </button>
//           </div>
//           <svg
//             className={s.spanSingUp}
//             width="44"
//             height="44"
//             viewBox="0 0 32 32"
//           >
//             <use href="/src/icons/symbol-defs.svg#icon-pie-chart-02"></use>
//           </svg>
//           <svg
//             className={s.spanSingUp}
//             width="44"
//             height="44"
//             viewBox="0 0 32 32"
//           >
//             <use href="/src/icons/symbol-defs.svg#icon-eye"></use>
//           </svg>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrPage;
