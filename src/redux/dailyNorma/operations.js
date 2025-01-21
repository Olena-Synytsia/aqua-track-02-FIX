import { authApi } from "../auth/operations.js";

export const getWaterNorma = async () => {
  const { data } = await authApi.get(`/users/current`);
  console.log("water norma data", data.data);
  return data.data.waterNorma;
};

export const getWaterPercent = async (date) => {
  const { data } = await authApi.get(`/water/day/${date}`);
  console.log("water day data", data.data);
  return data.data;
};
