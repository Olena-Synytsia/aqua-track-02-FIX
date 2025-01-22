// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
// import {
//   authApi,
//   refresh,
//   setAuthHeader,
// } from "../../redux/auth/operations.js";

// const Refresh = () => {
//   const isLogin = useSelector(selectIsLoggedIn);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!isLogin) return;

//     const interceptor = authApi.interceptors.response.use(
//       (response) => response,
//       async (err) => {
//         const originalRequest = err.config;

//         if (
//           err.response?.status === 401 &&
//           err.config &&
//           !originalRequest._retry
//         ) {
//           originalRequest._retry = true;

//           try {
//             const { accessToken } = await dispatch(refresh()).unwrap();
//             setAuthHeader(accessToken);
//             console.log("Retrying request with new token:", accessToken);

//             originalRequest.headers.Authorization = "Bearer " + accessToken;

//             return await authApi(originalRequest);
//           } catch (refreshError) {
//             console.error("Refresh error during retry:", refreshError);
//             return Promise.reject(refreshError);
//           }
//         }

//         return Promise.reject(err);
//       }
//     );

//     return () => {
//       authApi.interceptors.response.eject(interceptor);
//     };
//   }, [dispatch, isLogin]);

//   return null;
// };

// export default Refresh;
