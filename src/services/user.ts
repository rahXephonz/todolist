import apiClient from "libs/apiClient";
import { Users } from "types/data";

const getUsersData = async (no: number) => {
  const response = await apiClient.get<Users>(`/users/${no}`);
  return response.data;
};

const userService = { getUsersData };

export default userService;
