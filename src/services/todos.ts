// import apiClient from "libs/apiClient";
// import lib from "libs/transforms";
// import type { Todos } from "types/data";

// const getAllTodosData = async (id: number) => {
//   const response = await apiClient.get<{ data: Todos[] }>(
//     `/todo-items${id ? `?activity_group_id=${id}` : ""}`,
//   );

//   return lib.transformObjectKeysToCamelCase(response.data);
// };

// const createTodos = async ({
//   title,
//   activity_group_id,
//   priority,
//   is_active,
// }: Todos) => {
//   const response = await apiClient.post<Todos>("/todo-items", {
//     activity_group_id,
//     title,
//     priority,
//     is_active,
//   });

//   return response.data;
// };

// const updateTodos = async (
//   id: number,
//   { is_active, priority, title, activity_group_id }: Todos,
// ) => {
//   const response = await apiClient.patch<Todos>(`/todo-items/${id}`, {
//     activity_group_id,
//     title,
//     priority,
//     is_active,
//   });

//   return response.data;
// };

// const deleteTodos = async (id: number) => {
//   const response = await apiClient.delete(`/todo-items/${id}`);

//   return response.data;
// };

// const todosService = {
//   getAllTodosData,
//   createTodos,
//   updateTodos,
//   deleteTodos,
// };

// export default todosService;

export {};
