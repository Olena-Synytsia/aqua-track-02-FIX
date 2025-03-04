import axios from "axios";

const getUsersApi = axios.create({
  baseURL: "https://aqua-api-fix.onrender.com",
});

export const fetchCounter = async () => {
  try {
    const { data } = await getUsersApi.get("/users/all");
    return data.data.usersCount;
  } catch {
    console.log("Error with users count");
  }
};
