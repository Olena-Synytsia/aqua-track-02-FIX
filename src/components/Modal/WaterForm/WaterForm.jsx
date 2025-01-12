import * as Yup from "yup";
import { RxMinusCircled, RxPlusCircled } from "react-icons/rx";
import s from "./WaterForm.module.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const WaterForm = ({ initialData, operationType, onClose }) => {
  const validationSchema = Yup.object().shape({
    waterAmount: Yup.number()
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
      waterAmount: initialData.waterAmount || 50,
      time:
        initialData.time ||
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  });

  const waterAmount = watch("waterAmount");

  const incrementWater = () => setValue("waterAmount", waterAmount + 50);
  const decrementWater = () =>
    setValue("waterAmount", Math.max(1, waterAmount - 50));

  const onSubmit = (data) => {
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
          name="waterAmount"
          control={control}
          render={({ field }) => (
            <p name="waterAmount" className={s.counterValue}>
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
        value={waterAmount === 0 ? "" : waterAmount}
        onChange={(e) => setValue("waterAmount", Number(e.target.value))}
      />
      <button type="submit" className={s.saveBtn}>
        Save
      </button>
    </form>
  );
};
export default WaterForm;
