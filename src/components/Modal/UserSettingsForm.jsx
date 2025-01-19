import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import style from "./UserSettingsForm.module.css";
import { AiOutlineUpload } from "react-icons/ai";
import { getCurrentUser, updateUser } from "../../redux/users/operations";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../../redux/avatar/slice";
import { setName } from "../../redux/users/slice";
// import { BsExclamationLg } from "react-icons/bs";

// import { setImage } from "../../redux/avatar/slice";
// import { useDispatch } from "react-redux";
// import { setName } from "../../redux/auth/slice";

const DEFAULT_AVATAR_URL =
  "https://res.cloudinary.com/dwshxlkre/image/upload/v1736365275/avatar_yajq6q.png";

const schema = yup.object().shape({
  photo: yup.mixed(),
  gender: yup.string().required("Please select a gender"),
  name: yup.string(),
  email: yup.string().email("Invalid email"),
  weight: yup
    .number()
    .positive("Weight must be positive")
    .required("Weight is required"),
  activeTime: yup
    .number()
    .min(0, "Active time must be 0 or more")
    .required("Active time is required"),
  waterNorma: yup
    .number()
    .min(0, "Water must be at least 0")
    .required("This field is required"),
  waterToDrink: yup
    .number()
    .min(0, "Water to drink must be at least 0")
    .required("This field is required"),
});

const UserSettingsForm = ({ onSubmit = () => {}, onClose = () => {} }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [preview, setPreview] = useState(user?.photo || DEFAULT_AVATAR_URL);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...user,
      waterNorma: user?.waterNorma || 1500,
    },
  });

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser());
    } else {
      setPreview(user.photo || DEFAULT_AVATAR_URL);
      Object.entries(user).forEach(([key, value]) => setValue(key, value));
    }
  }, [dispatch, user, setValue]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photo = URL.createObjectURL(file);
      setPreview(photo);
      setValue("photo", file);
    } else {
      setPreview(DEFAULT_AVATAR_URL);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "aqua-tracker-gr2");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dwshxlkre/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  };

  const calculateWaterNorma = (weight, activeTime, gender) => {
    if (!weight || !activeTime || !gender) return 1500;
    const waterNorma =
      gender.toLowerCase() === "woman"
        ? weight * 0.03 + activeTime * 0.4
        : weight * 0.04 + activeTime * 0.6;
    return Number(waterNorma.toFixed(1));
  };

  const weight = watch("weight");
  const activeTime = watch("activeTime");
  const gender = watch("gender");
  const waterNorma = calculateWaterNorma(weight, activeTime, gender);

  const handleFormSubmit = async (data) => {
    let photoURL = user?.photo || DEFAULT_AVATAR_URL;
    if (data.photo instanceof File) {
      photoURL = await uploadImage(data.photo);
    }

    const waterNorma = calculateWaterNorma(
      data.weight,
      data.activeTime,
      data.gender
    );

    const dataToSave = {
      ...data,
      waterNorma, // Включаємо waterNorma
      photo: photoURL, // Використовуємо URL для фото
    };

    console.log("Data to send:", dataToSave);
    dispatch(updateUser(dataToSave));
    dispatch(setImage(photoURL));
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
        <label htmlFor="photo" className={style.avatarUploadBtn}>
          <AiOutlineUpload className={style.uploadIcon} />
          Upload a photo
          <input
            type="file"
            id="photo"
            accept="image/*"
            // {...register("photo")}
            onChange={handleAvatarChange}
            className={style.avatarInput}
          />
        </label>
        {errors.photo && (
          <p className={style.errorText}>{errors.photo.message}</p>
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
            onBlur={() => calculateWaterNorma(weight, activeTime, gender)}
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
            onBlur={() => calculateWaterNorma(weight, activeTime, gender)}
          />
          {errors.activeTime && (
            <p className={style.errorText}>{errors.activeTime.message}</p>
          )}
        </div>
      </div>
      <label>The required amount of water in liters per day: </label>
      <span className={style.waterIntake}>
        {waterNorma ? `${waterNorma} L` : " 0.0 L"}
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
