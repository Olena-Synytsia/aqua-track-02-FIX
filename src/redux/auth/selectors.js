export const selectUserInfo = (state) => state.auth.userInfo;
export const selectTokens = (state) => state.auth.accessToken;
// export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
// export const selectEmail = (state) => state.user.email;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRegistered = (state) => state.auth.isRegistered;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
// export const selectUserName = (state) => state.user.userInfo?.name; // Селектор для отримання імені
