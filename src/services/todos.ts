import apiClient from "libs/apiClient";
import { Todos } from "types/data";

const getDetailTodosData = async (no: number) => {
  const response = await apiClient.get<{ data: Todos }>(`/todo-items/${no}`);

  return response.data;
};

const getAllTodosData = async (no?: number) => {
  const response = await apiClient.get<{ data: Todos[] }>(
    `/todo-items${no ? `?activity_group_id=${no}` : ""}`,
  );

  return response.data;
};

const todosService = { getDetailTodosData, getAllTodosData };

export default todosService;
