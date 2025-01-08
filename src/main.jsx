// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { Provider } from "react-redux";
// import { persistor, store } from "./redux/store.js";
// import { BrowserRouter } from "react-router-dom";
// import { PersistGate } from "redux-persist/integration/react";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </PersistGate>
//     </Provider>
//   </StrictMode>
// );

// import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
