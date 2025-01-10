import axios from '../../helpers/axiosConfig';

export const requestGetWaterDay = async (date) => {
    const { data } = await axios.get(`/water/daily/${date}`);
    return data;
  };