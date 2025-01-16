import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import style from "./UserSettingsForm.module.css";
import { AiOutlineUpload } from "react-icons/ai";
import { setImage } from "../../redux/avatar/slice";
import { useDispatch } from "react-redux";
import { setName } from "../../redux/name/slice";

const DEFAULT_AVATAR_URL =
  "https://static.ukrinform.com/photos/2022_12/thumb_files/630_360_1672356307-406.jpeg";

const schema = yup.object().shape({
  avatar: yup.mixed(),
  gender: yup.string().required("Please select a gender"),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  weight: yup
    .number()
    .positive("Weight must be positive")
    .required("Weight is required"),
  activeTime: yup
    .number()
    .min(0, "Active time must be 0 or more")
    .required("Active time is required"),
  waterToDrink: yup
    .number()
    .min(0, "Water must be at least 0")
    .required("This field is required"),
});

const UserSettingsForm = ({ onSubmit = () => {}, onClose = () => {} }) => {
  const [preview, setPreview] = useState(DEFAULT_AVATAR_URL);
  const dispatch = useDispatch();

  const savedData = useMemo(() => {
    return JSON.parse(localStorage.getItem("userSettings")) || {};
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...savedData,
      dailyWaterIntake: savedData.dailyWaterIntake || 0,
    },
  });

  useEffect(() => {
    if (savedData.avatar) {
      setPreview(savedData.avatar || DEFAULT_AVATAR_URL);
      setValue("avatar", savedData.avatar);
    }
    Object.entries(savedData).forEach(([key, value]) => setValue(key, value));
  }, [setValue, savedData]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Отримуємо Base64
        const base64Image = reader.result;
        setPreview(base64Image);
        setValue("avatar", base64Image);

        const updatedData = { ...savedData, avatar: base64Image };
        localStorage.setItem("userSettings", JSON.stringify(updatedData));
      };
      reader.onerror = () => {
        console.error("Error reading file as Base64");
      };
      reader.readAsDataURL(file); // Перетворює файл у Base64
    } else {
      setPreview(DEFAULT_AVATAR_URL);
      const updatedData = { ...savedData, avatar: DEFAULT_AVATAR_URL };
      localStorage.setItem("userSettings", JSON.stringify(updatedData));
    }
  };

  const calculateWaterIntake = (weight, activeTime, gender) => {
    if (!weight || !activeTime || !gender) return 0;
    const waterIntake =
      gender === "Woman"
        ? weight * 0.03 + activeTime * 0.4
        : weight * 0.04 + activeTime * 0.6;
    return waterIntake.toFixed(1);
  };

  const weight = watch("weight");
  const activeTime = watch("activeTime");
  const gender = watch("gender");

  const dailyWaterIntake = calculateWaterIntake(weight, activeTime, gender);

  const handleFormSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    const dataToSave = {
      ...data,
      avatarPreview: preview,
    };
    localStorage.setItem("userSettings", JSON.stringify(dataToSave));
    dispatch(setImage(preview));
    dispatch(setName(data.name));
    onSubmit(dataToSave);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={style.formContainer}
    >
      <div className={style.avatarSection}>
        {preview && (
          <img src={preview} alt="Preview" className={style.avatarPreview} />
        )}
        <label htmlFor="avatar" className={style.avatarUploadBtn}>
          <AiOutlineUpload className={style.uploadIcon} />
          Upload a photo
          <input
            type="file"
            id="avatar"
            accept="image/*"
            {...register("avatar")}
            onChange={handleAvatarChange}
            className={style.avatarInput}
          />
        </label>
        {errors.avatar && (
          <p className={style.errorText}>{errors.avatar.message}</p>
        )}
      </div>

      <div className={style.formGroup}>
        <label className={style.userDetails}>Your gender identity</label>
        <div className={style.radioGroup}>
          <label className={style.radioLabel}>
            <input type="radio" value="Woman" {...register("gender")} />
            <span className={style.radioCustom}></span>
            Woman
          </label>
          <label className={style.radioLabel}>
            <input type="radio" value="Man" {...register("gender")} />
            <span className={style.radioCustom}></span>
            Man
          </label>
        </div>
        {errors.gender && (
          <p className={style.errorText}>{errors.gender.message}</p>
        )}
      </div>

      <div className={style.formGroup}>
        <div>
          <label className={style.userDetails}>Your name</label>
          <input type="text" {...register("name")} />
          {errors.name && (
            <p className={style.errorText}>{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className={style.userDetails}>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <p className={style.errorText}>{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className={style.formGroup}>
        <div className={style.dailyNormSection}>
          <h4>My daily norma</h4>
          <div className={style.dailyNormEquations}>
            <p>
              <strong>For woman:</strong> V=(M*0.03) + (T*0.4)
            </p>
            <p>
              <strong>For man:</strong> V=(M*0.04) + (T*0.6)
            </p>
          </div>
          <div className={style.dailyNormInfo}>
            <p>
              <strong>* V</strong> is the volume of the water norm in liters per
              day, <strong>M</strong> is your body weight, <strong>T</strong> is
              the time of active sports, or another type of activity
              commensurate in terms of loads (in the absence of these, you must
              set 0).
            </p>
          </div>
        </div>

        <div className={style.infoMessage}>
          <span className={style.icon}>!</span>
          <span>Active time in hours</span>
        </div>
      </div>

      <div className={style.formGroup}>
        <div>
          <label>Your weight in kilograms:</label>
          <input
            type="number"
            {...register("weight")}
            onBlur={() => calculateWaterIntake(weight, activeTime, gender)}
          />
          {errors.weight && (
            <p className={style.errorText}>{errors.weight.message}</p>
          )}
        </div>

        <div>
          <label>The time of active participation in sports:</label>
          <input
            type="number"
            {...register("activeTime")}
            onBlur={() => calculateWaterIntake(weight, activeTime, gender)}
          />
          {errors.activeTime && (
            <p className={style.errorText}>{errors.activeTime.message}</p>
          )}
        </div>
      </div>
      <label>The required amount of water in liters per day: </label>
      <span className={style.waterIntake}>
        {dailyWaterIntake ? `${dailyWaterIntake} L` : " 0.0 L"}
      </span>

      <label>Write down how much water you will drink:</label>
      <input type="number" {...register("waterToDrink")} />
      {errors.waterToDrink && (
        <p className={style.errorText}>{errors.waterToDrink.message}</p>
      )}

      <button type="submit" className={style.saveBtn}>
        Save
      </button>
    </form>
  );
};

export default UserSettingsForm;
