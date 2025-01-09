export const selectWaterList = (state) => state.water.waterList;
export const selectError = (state) => state.water.error;

// Оновлення компонентів (WaterProgressBar, WaterList, Calendar)
// import { useSelector } from "react-redux";
// import { selectWaterList } from "./waterSelectors";

// const WaterList = () => {
//   const waterList = useSelector(selectWaterList);

//   return (
//     <ul>
//       {waterList.map((record) => (
//         <li key={record.id}>
//           {record.amount} ml - {record.time}
//         </li>
//       ))}
//     </ul>
//   );
// };

//  Компонент DeleteWaterModal

//  import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteWaterRecord } from './waterThunks';
// import { selectError } from './waterSelectors';
// import { toast } from 'react-toastify';

// const DeleteWaterModal = ({ recordId, onClose }) => {
//   const dispatch = useDispatch();
//   const error = useSelector(selectError);

//   const handleDelete = async () => {
//     const resultAction = await dispatch(deleteWaterRecord(recordId));

//     if (deleteWaterRecord.fulfilled.match(resultAction)) {
//       toast.success('Record deleted successfully');
//       onClose(); // Закриваємо модальне вікно
//     } else if (deleteWaterRecord.rejected.match(resultAction)) {
//       toast.error(resultAction.payload || 'Failed to delete record');
//     }
//   };

//   return (
//     <div className="modal">
//       <h2>Are you sure you want to delete this record?</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <button onClick={handleDelete}>Delete</button>
//       <button onClick={onClose}>Cancel</button>
//     </div>
//   );
// };

// export default DeleteWaterModal;
