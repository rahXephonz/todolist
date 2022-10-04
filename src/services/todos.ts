import apiClient from "libs/apiClient";
import { transformObjectKeysToCamelCase } from "libs/transforms";
import { Todos } from "types/data";

const getDetailTodosData = async (id: number) => {
  const response = await apiClient.get<{ data: Todos }>(`/todo-items/${id}`);

  return transformObjectKeysToCamelCase(response.data);
};

const getAllTodosData = async (id: number) => {
  const response = await apiClient.get<{ data: Todos[] }>(
    `/todo-items${id ? `?activity_group_id=${id}` : ""}`,
  );

  return transformObjectKeysToCamelCase(response.data);
};

const createTodos = async ({ title, activity_group_id, priority }: Todos) => {
  const response = await apiClient.post<Todos>("/todo-items", {
    activity_group_id,
    title,
    priority,
  });

  return response.data;
};

const todosService = { getDetailTodosData, getAllTodosData, createTodos };

export default todosService;
