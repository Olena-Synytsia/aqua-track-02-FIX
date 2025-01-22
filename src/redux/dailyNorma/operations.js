import { authApi } from "../auth/operations.js";

export const getWaterNorma = async () => {
  const { data } = await authApi.get(`/users/current`);

  return data.data.waterNorma;
};

export const getWaterPercent = async (date) => {
  const { data } = await authApi.get(`/water/day/${date}`);

  return data.data;
};
