import * as Yup from "yup";
import { RxMinusCircled, RxPlusCircled } from "react-icons/rx";
import s from "./WaterForm.module.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addItems,
  selectOperationType,
  updateItem,
} from "../../../redux/dailyInfo/dailyInfoSlice.js";
import { useDispatch, useSelector } from "react-redux";

const WaterForm = ({ initialData, onClose }) => {
  const operationType = useSelector(selectOperationType);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    volume: Yup.number()
      .required("Please enter the amount of water.")
      .min(1, "The minimum amount is 1ml.")
      .max(5000, "The maximum amount is 5000ml."),
    time: Yup.string()
      .required("Please enter the time.")
      .matches(
        /^([0-1]?\d|2[0-3]):([0-5]?\d)$/,
        "Please enter a valid time in hh:mm format."
      ),
  });

  const { watch, setValue, control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      id: initialData?.id || 1,
      volume: initialData?.volume || 50,
      time:
        initialData?.time ||
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  });

  const volume = watch("volume");

  const incrementWater = () => setValue("volume", volume + 50);
  const decrementWater = () => setValue("volume", Math.max(1, volume - 50));

  const onSubmit = (data) => {
    if (operationType === "add") {
      dispatch(addItems(data));
    } else {
      dispatch(updateItem(data));
    }
    console.log(data);
    onClose();
  };

  const title =
    operationType === "add" ? "Choose a value" : "Correct entered data:";

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>{title}</h3>
      <p className={s.formText}>Amount of water:</p>
      <div className={s.counter}>
        <button onClick={decrementWater} type="button" className={s.counterBtn}>
          <RxMinusCircled className={s.iconBtn} />
        </button>
        <Controller
          name="volume"
          control={control}
          render={({ field }) => (
            <p name="volume" className={s.counterValue}>
              {field.value} ml
            </p>
          )}
        />
        <button onClick={incrementWater} type="button" className={s.counterBtn}>
          <RxPlusCircled className={s.iconBtn} />
        </button>
      </div>
      <p className={s.formText}>Recording time:</p>
      <Controller
        name="time"
        control={control}
        render={({ field }) => (
          <input {...field} className={s.input} type="time" />
        )}
      />
      <h3 className={s.nameInputUsed}>Enter the value of the water used:</h3>
      <input
        className={s.input}
        type="number"
        min="1"
        max="5000"
        value={volume === 0 ? "" : volume}
        onChange={(e) => setValue("volume", Number(e.target.value))}
      />
      <button type="submit" className={s.saveBtn}>
        Save
      </button>
    </form>
  );
};
export default WaterForm;
