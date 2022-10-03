import apiClient from "libs/apiClient";
import { Todos } from "types/data";

const getTodosData = async (no: number) => {
  const response = await apiClient.get<Todos>(`/todos/${no}`);

  return response.data;
};

const todosService = { getTodosData };

export default todosService;
