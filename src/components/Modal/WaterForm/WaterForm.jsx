import * as Yup from "yup";
import { RxMinusCircled, RxPlusCircled } from "react-icons/rx";
import s from "./WaterForm.module.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  selectItemId,
  selectOperationType,
  selectWaterItem,
} from "../../../redux/dailyInfo/dailyInfoSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addWaterItem,
  updateWaterItem,
} from "../../../redux/dailyInfo/dailyInfoOps.js";
import dayjs from "dayjs";
import { fetchWaterPer } from "../../../redux/monthInfo/getWaterPercent.js";
import { fetchWaterPercent } from "../../../redux/dailyNorma/slice.js";

const WaterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const operationType = useSelector(selectOperationType);
  const initialData = useSelector(selectWaterItem);
  const itemId = useSelector(selectItemId);

  const currentItem = initialData.find((item) => item._id === itemId);

  const extractTime = (date) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const combineDateTime = (date, time) => {
    const datePart = dayjs(date).format("YYYY-MM-DD");
    return `${datePart}T${time}`;
  };

  const validationSchema = Yup.object().shape({
    volume: Yup.number()
      .required("Please enter the amount of water.")
      .min(50, "The minimum amount is 1ml.")
      .max(5000, "The maximum amount is 5000ml."),
    date: Yup.string()
      .required("Please enter the time.")
      .matches(
        /^([0-1]?\d|2[0-3]):([0-5]?\d)$/,
        "Please enter a valid time in hh:mm format."
      ),
  });

  const { watch, setValue, control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      volume: operationType === "add" ? 50 : currentItem.volume,
      date:
        operationType === "add"
          ? extractTime(new Date())
          : extractTime(currentItem.date),
    },
  });

  const volume = watch("volume");

  const incrementWater = () => setValue("volume", volume + 50);
  const decrementWater = () => setValue("volume", Math.max(1, volume - 50));

  const onSubmit = (data) => {
    const fullDate = combineDateTime(
      currentItem ? new Date(currentItem.date) : new Date(),
      data.date
    );

    let preparedData = {
      volume: data.volume,
      date: fullDate,
    };

    if (operationType === "edit") {
      preparedData = {
        ...preparedData,
        _id: currentItem._id,
      };
    }

    const today = dayjs(new Date()).format("YYYY-MM-DD");
    const todayForMonth = dayjs(new Date()).format("YYYY-MM");

    if (operationType === "add") {
      dispatch(addWaterItem(preparedData));
      dispatch(fetchWaterPer(todayForMonth));
      dispatch(fetchWaterPercent(today));
    } else {
      dispatch(updateWaterItem(preparedData));
      dispatch(fetchWaterPer(todayForMonth));
      dispatch(fetchWaterPercent(today));
    }

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
        name="date"
        control={control}
        render={({ field }) => (
          <input {...field} className={s.input} type="time" />
        )}
      />
      <h3 className={s.nameInputUsed}>Enter the value of the water used:</h3>
      <input
        className={s.input}
        type="number"
        min="50"
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
