import apiClient from "libs/apiClient";
import { transformObjectKeysToCamelCase } from "libs/transforms";
import { Todos } from "types/data";

const getDetailTodosData = async (no: number) => {
  const response = await apiClient.get<{ data: Todos }>(`/todo-items/${no}`);

  return transformObjectKeysToCamelCase(response.data);
};

const getAllTodosData = async (no?: number) => {
  const response = await apiClient.get<{ data: Todos[] }>(
    `/todo-items${no ? `?activity_group_id=${no}` : ""}`,
  );

  return transformObjectKeysToCamelCase(response.data);
};

const todosService = { getDetailTodosData, getAllTodosData };

export default todosService;
