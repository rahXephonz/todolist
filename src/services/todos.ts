import { Todos } from "types/data";
import { CoreAPI } from "./core";

class Todo extends CoreAPI {
  deleteTodos = async (id: number) => {
    return await this.extracts(`/todo-items/${id}`, "DELETE");
  };

  getAllTodos = async (id: number) => {
    return await this.extracts<{ data: Todos[] }>(
      `/todo-items${id ? `?activity_group_id=${id}` : ""}`,
      "GET",
    );
  };

  createTodos = async (props: Todos) => {
    return await this.extracts("/todo-items", "POST", {
      json: {
        ...props,
      },
    });
  };

  updateTodos = async (id: number, props: Todos) => {
    return await this.extracts(`/todo-items/${id}`, "PATCH", {
      json: {
        ...props,
      },
    });
  };
}

const todo = new Todo();

export default todo;
