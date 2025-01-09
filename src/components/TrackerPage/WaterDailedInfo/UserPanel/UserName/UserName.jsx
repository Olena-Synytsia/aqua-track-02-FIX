const UserName = () => {
  return <h1>Hello, {UserName.name}</h1>;
};

export default UserName;

// import React, { useState } from 'react';

// function App() {
//   const [email, setEmail] = useState('');

//   // Функція для витягування частини до '@'
//   const getNameBeforeAt = (email) => {
//     return email.split('@')[0]; // Розбиваємо email на дві частини по '@' і беремо першу
//   };

//   return (
//     <div>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter your email"
//       />
//       <p>Hello, {getNameBeforeAt(email)}!</p>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';

// // Функція для витягування частини email до '@'
// const getNameBeforeAt = (email) => {
//   return email.split('@')[0]; // Розбиваємо email на дві частини по '@' і беремо першу
// };

// const UserName = () => {
//   const [email, setEmail] = useState(''); // Стан для зберігання email

//   useEffect(() => {
//     // Імітація запиту до бекенду
//     const fetchEmailFromBackend = async () => {
//       // Приклад запиту, який отримує email
//       const response = await fetch('/api/get-email'); // Замість цього використовуйте свій реальний API
//       const data = await response.json();
//       setEmail(data.email); // Припускаємо, що сервер повертає { email: "user@example.com" }
//     };

//     fetchEmailFromBackend();
//   }, []);

//   return <h1>Hello, {getNameBeforeAt(email)}</h1>;
// };

// export default UserName;

// useState: Створює стан для зберігання email.
// useEffect: Виконується після рендеру компонента і ініціює асинхронний запит до бекенду, щоб отримати email.
// getNameBeforeAt: Функція, яка розбиває email і витягує ім'я користувача до символу @.
