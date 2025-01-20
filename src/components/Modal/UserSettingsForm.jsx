import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import style from "./UserSettingsForm.module.css";
import { AiOutlineUpload } from "react-icons/ai";
import { getCurrentUser, updateUser } from "../../redux/users/operations";
import { useDispatch, useSelector } from "react-redux";

import { setImage, setName } from "../../redux/users/slice";
import { selectTokens } from "../../redux/auth/selectors";
import { BsExclamationLg } from "react-icons/bs";

const DEFAULT_AVATAR_URL =
  "https://res.cloudinary.com/dwshxlkre/image/upload/v1736365275/avatar_yajq6q.png";

  const schema = yup.object().shape({
    photo: yup.mixed().nullable(),
    gender: yup.string().nullable(), // Убираем обязательность
    name: yup.string().nullable(),
    email: yup.string().email("Invalid email").nullable(),
    weight: yup
      .number()
      .positive("Weight must be positive")
      .nullable(), // Указываем, что поле может быть пустым
    activeTime: yup
      .number()
      .min(0, "Active time must be 0 or more")
      .nullable(),
    waterNorma: yup.number().min(0, "Water must be at least 0").nullable(),
  });
  

const UserSettingsForm = ({ onSubmit = () => {}, onClose = () => {} }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // const userId = useSelector((state) => state.user.userId);
  // console.log("User ID from Redux:", userId);
  const accessToken = useSelector(selectTokens);
  console.log("Access Token from Redux:", accessToken);
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
        waterNorma: user?.waterNorma || 1.5,
        gender: user?.gender || "woman", // Устанавливаем Woman по умолчанию
      },
    });
    
    useEffect(() => {
      if (!user) {
        dispatch(getCurrentUser());
      } else {
        setPreview(user.photo || DEFAULT_AVATAR_URL);
    
        // Устанавливаем значения в форму после загрузки пользователя
        Object.entries(user).forEach(([key, value]) => setValue(key, value));
    
        // Если gender отсутствует, задаем Woman как значение по умолчанию
        if (!user.gender) {
          setValue("gender", "woman");
        }
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
    try {
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const calculateWaterNorma = (weight, activeTime, gender) => {
    if (!weight || !activeTime || !gender) return 1.5;
    const waterNorma =
      gender.toLowerCase() === "woman"
        ? weight * 0.03 + activeTime * 0.4
        : weight * 0.04 + activeTime * 0.6;
    return Math.max(0, Number(waterNorma.toFixed(1)));
  };

  const weight = watch("weight");
  const activeTime = watch("activeTime");
  const gender = watch("gender");
  const waterNorma = calculateWaterNorma(weight, activeTime, gender);

  const handleFormSubmit = async (data) => {
    console.log("Form is submitted, data:", data); // тут ок
    let photoURL = user?.photo || DEFAULT_AVATAR_URL;
    if (data.photo && data.photo instanceof File) {
      try {
        photoURL = await uploadImage(data.photo);
      } catch {
        alert("Failed to upload image");
        return;
      }
    }

    const waterNorma = calculateWaterNorma(
      data.weight,
      data.activeTime,
      data.gender
    );

    const dataToSave = {
      // userId: userId,
      ...data,
      waterNorma,
      photo: photoURL,
    };
    const formData = new FormData();
    Object.keys(dataToSave).forEach((key) => {
      formData.append(key, dataToSave[key]);
    });

    console.log("Token:", accessToken);

    try {
      console.log("Preparing to dispatch updateUser with data:", dataToSave);
      const response = await dispatch(
        updateUser({ data: dataToSave, accessToken })
      );
      console.log("Response from dispatch:", response); // тут помилка!!!

      if (response.error) {
        throw new Error(response.error.message);
      }
      console.log("Data to send:", dataToSave);
      dispatch(setImage(photoURL));
      dispatch(setName(data.name));

      onSubmit(dataToSave);
      onClose();
    } catch (error) {
      alert(error.message); // Показуємо помилку
    }
  };

  //   console.log("Data to send:", dataToSave);
  //   dispatch(updateUser(dataToSave));
  //   dispatch(setImage(photoURL));
  //   dispatch(setName(data.name));
  //   onSubmit(dataToSave);
  //   onClose();
  // };

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
            {...register("photo")}
            onChange={handleAvatarChange}
            className={style.avatarInput}
          />
        </label>
        {errors.photo && (
          <p className={style.errorText}>{errors.photo.message}</p>
        )}
      </div>
      <div className={style.setWrap}>
        <div className={style.setWrapInfo}>
          <div className={style.formGroup}>
            <div className={style.formWrap}>
              <h4>Your gender identity</h4>
            </div>
            <div className={style.radioGroup}>
              <label className={style.radioLabel}>
                <input type="radio" value="woman" {...register("gender")} />
                <span className={style.radioCustom}></span>
                Woman
              </label>
              <label className={style.radioLabel}>
                <input type="radio" value="man" {...register("gender")} />
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
              <div className={style.formWrap}>
                <h4>Your name</h4>
                <input
                  className={style.formInput}
                  type="text"
                  {...register("name")}
                />
                {errors.name && (
                  <p className={style.errorText}>{errors.name.message}</p>
                )}
              </div>
            </div>
            <div>
              <h4>Email</h4>
              <input
                className={style.formInput}
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className={style.errorText}>{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className={style.formWrap}>
            <h4>My daily norma</h4>
          </div>
          <div className={style.dailyNormSection}>
            <p className={style.dailyNormWrap}>
              For woman:
              <br />
              <span className={style.dailyNormEquations}>
                V = (M*0.03) + (T*0.4)
              </span>
            </p>
            <p>
              For man:
              <br />
              <span className={style.dailyNormEquations}>
                V = (M*0.04) + (T*0.6)
              </span>
            </p>
          </div>
          <div className={style.dailyNormInfo}>
            <p>
              <span className={style.icon}>*</span> V is the volume of the water
              norm in liters per day, M is your body weight, T is the time of
              active sports, or another type of activity commensurate in terms
              of loads (in the absence of these, you must set 0).
            </p>
          </div>

          <div className={style.infoMessage}>
            <span className={style.iconAttention}>
              <BsExclamationLg style={{ width: "30px", height: "30px" }}/>
            </span>

            <p>Active time in hours</p>
          </div>
        </div>
        <div className={style.setWrapInfoMod}>
          <div>
            <div className={style.formWrap}>
              <label className={style.descForm}>
                Your weight in kilograms:
              </label>
              <input
                className={style.formInput}
                type="number"
                {...register("weight")}
                onBlur={() => calculateWaterNorma(weight, activeTime, gender)}
              />
              {errors.weight && (
                <p className={style.errorText}>{errors.weight.message}</p>
              )}
            </div>
          </div>
          <div>
            <div className={style.formWrap}>
              <label className={style.descForm}>
                The time of active participation in sports:
              </label>
              <input
                className={style.formInput}
                type="number"
                {...register("activeTime")}
                onBlur={() => calculateWaterNorma(weight, activeTime, gender)}
              />
              {errors.activeTime && (
                <p className={style.errorText}>{errors.activeTime.message}</p>
              )}
            </div>
          </div>
          <div className={style.descWrap}>
            <label className={style.descForm}>
              The required amount of water in liters per day:{" "}
            </label>
            <span className={style.waterIntake}>
              {waterNorma ? `${waterNorma} L` : " 0.0 L"}
            </span>
          </div>
          <h4 className={style.waterNorma}>
            Write down how much water you will drink:
          </h4>
          <input
            className={style.formInput}
            type="number"
            {...register("waterNorma")}
          />
          {errors.waterToDrink && (
            <p className={style.errorText}>{errors.waterToDrink.message}</p>
          )}
        </div>
      </div>
      <button type="submit" className={style.saveBtn}>
        Save
      </button>
    </form>
  );
};

export default UserSettingsForm;
