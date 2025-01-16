export const clearStore = () => {
    return (dispatch) => {
      // Очистка localStorage
      localStorage.clear();
  
      // Действие для сброса хранилища (Redux store)
      dispatch({ type: "RESET_STORE" });
    };
  };
  